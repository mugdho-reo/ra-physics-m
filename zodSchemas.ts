import { z } from 'zod';

export const addOperatorSchema = z.object({
    mobile : z.string().min(11, { message: 'Mobile number must be 11 digits' }).max(11, { message: 'Mobile number must be 11 digits' }).regex(/^[0-9]+$/, { message: 'Mobile number must be digits only' }),
    confirmMobile : z.string().min(11, { message: 'Confirm mobile number must be 11 digits' }).max(11, { message: 'Confirm mobile number must be 11 digits' }).regex(/^[0-9]+$/, { message: 'Confirm mobile number must be digits only' }),
}).refine((data) => data?.mobile === data?.confirmMobile, {
    message: 'Mobile numbers do not match',
})

export const changeAdminPasswordSchema = z.object({
    oldPassword: z.string().min(1, { message: 'Old password is required' }),
    newPassword: z.string().min(1, { message: 'New password is required' }),
    confirmNewPassword: z.string().min(1, { message: 'Confirm new password is required' }),
}).refine((data) => data?.newPassword === data?.confirmNewPassword, {
    message: 'New passwords do not match',
});