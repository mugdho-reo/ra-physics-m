'use server'
import prisma from '@/lib/db';
import bcryptjs from 'bcryptjs';
import { changeAdminPasswordSchema,
    addOperatorSchema,
 } from "@/zodSchemas";


type Error = {
    oldPassword?: string[];
    newPassword?: string[];
    confirmNewPassword?: string[];
    passwordMismatch?: string[];
}


export async function sendSms({ to, msg }: { to: string; msg: string }) {
  const apiKey = process.env.SMS_API_KEY;

  if (!apiKey) {
    throw new Error('SMS API key is not configured');
  }

  const formData = new URLSearchParams();
  formData.append('api_key', apiKey);
  formData.append('msg', msg);
  formData.append('to', to);

  try {
    const response = await fetch('https://api.sms.net.bd/sendsms', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: formData.toString(),
    });

    const text = await response.text();
    return { success: true, response: text };
  } catch (error) {
    console.error('SMS sending failed:', error);
    return { success: false, error: 'Failed to send SMS' };
  }
}


function generatePassword(length = 8): string {
    const charset = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let password = '';
    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * charset.length);
      password += charset[randomIndex];
    }
    return password;
  }
  

export async function addOperatorAction(prevstate: any, formData: FormData) {
    
    const validatedData = addOperatorSchema.safeParse({
        mobile: formData.get('mobile'),
        confirmMobile: formData.get('confirmMobile'),
    });

    if (!validatedData.success) {
        return {
            error: {
                ...validatedData.error.flatten().fieldErrors,
                mobileMismatch: validatedData.error.flatten().formErrors,
            },
            data: {
                mobile: formData.get('mobile') as string, 
                confirmMobile: formData.get('confirmMobile') as string
            },
        };
    }
    const { mobile } = validatedData.data;
    // check if operator already exists
    const operatorExists = await prisma.user.findFirst({
        where: {
            rollNumber: mobile,
            role: 'ADMIN',
        },
    });
    if (operatorExists) {
        return {
            error: {
                mobile: ['Operator already exists'],
            },
        };
    }

    const password = generatePassword(8);
    // send password to mobile number with sms service
    console.log('password:', password)
    const sent = await sendSms({to: mobile, msg: `Your password is ${password}\nMugdho`});
    console.log('SMS sent:', sent);




    const hashedPassword = await bcryptjs.hash(password, 10);
    const operator = await prisma.user.create({
        data: {
            rollNumber: mobile,
            password: hashedPassword,
            role: 'ADMIN',
        },
    });
    console.log('Operator created:', operator);
    return {
        success: true,
        
    }
}

export async function changeAdminPasswordAction(prevstate: any, formData: FormData) {

    const validatedData = changeAdminPasswordSchema.safeParse({
        oldPassword: formData.get('oldPassword'),
        newPassword: formData.get('newPassword'),
        confirmNewPassword: formData.get('confirmNewPassword'),
    });    

    if (!validatedData.success) {
        console.log('Validation failed:', validatedData.error.flatten());
        return {
            error: {
                ...validatedData.error.flatten().fieldErrors,
                passwordMismatch: validatedData.error.flatten().formErrors,
            } as Error,
            data: {
                oldPassword: formData.get('oldPassword') as string, 
                newPassword: formData.get('newPassword') as string, 
                confirmNewPassword: formData.get('confirmNewPassword') as string
            },
        };
    }
    const { oldPassword, newPassword } = validatedData.data;
    const user = await prisma.user.findFirst({
        where: {
            role: 'SUPER',
        },
    });
    if (!user) {
        console.log('Super admin not found');
        return {
            error: {
                oldPassword: ['Super admin not found'],
            } as Error,
            data: {
                oldPassword: formData.get('oldPassword') as string, 
                newPassword: formData.get('newPassword') as string, 
                confirmNewPassword: formData.get('confirmNewPassword') as string
            },
        };
    }
    const isMatch = await bcryptjs.compare(oldPassword, user.password);
    if (!isMatch) {
        return {
            error: {
                oldPassword: ['Old password is incorrect'],
            } as Error,
            data: {
                oldPassword: formData.get('oldPassword') as string, 
                newPassword: formData.get('newPassword') as string, 
                confirmNewPassword: formData.get('confirmNewPassword') as string
            },
        };
    }
    const hashedPassword = await bcryptjs.hash(newPassword, 10);
    await prisma.user.update({
        where: {
            id: user.id,
        },
        data: {
            password: hashedPassword,
        },
    });
    return {
        success: true,
    }

}

export async function addSuper() {

    console.log('Adding super admin...');

    //check if super admin already exists
    const superAdminExists = await prisma.user.findFirst({
        where: {
            role: 'SUPER',
        },
    });
    if (superAdminExists) {
        console.log('Super admin already exists');
        return;
    }
    //add default super admin with roll number 1 and password 123456
    const superAdmin = await prisma.user.create({
        data: {
            rollNumber: 'admin',
            password: 'admin',
            role: 'SUPER',
        },
    });
    console.log('Super admin created:', superAdmin);
}