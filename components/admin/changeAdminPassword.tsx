'use client';
import { changeAdminPasswordAction } from "@/actions/admin/adminActions";
import { useActionState } from "react";
export function ChangeAdminPassword() {
    const [state, formaction, pending] = useActionState(changeAdminPasswordAction, undefined);
    return (

        <div className="container mx-auto py-8 px-4">
            <h1 className="text-3xl font-semibold mb-6">Change Admin Password</h1>
            <form action={formaction}>
                <div>
                    <label htmlFor="oldPassword" className="block text-sm font-medium text-gray-700">Old Password</label>
                    {state?.error?.oldPassword && <p className="text-red-500 text-sm">{state?.error?.oldPassword}</p>}
                    <input defaultValue={state?.data?.oldPassword} type="password" name="oldPassword" id="oldPassword"  className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring-blue-500" />
                </div>
                <div>
                    <label htmlFor="newPassword" className="block text-sm font-medium text-gray-700">New Password</label>
                    {state?.error?.newPassword && <p className="text-red-500 text-sm">{state?.error?.newPassword}</p>}
                    <input defaultValue={state?.data?.newPassword} type="password" name="newPassword" id="newPassword"  className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring-blue-500" />
                </div>
                <div>
                    <label htmlFor="confirmNewPassword" className="block text-sm font-medium text-gray-700">Confirm New Password</label>
                    {state?.error?.confirmNewPassword && <p className="text-red-500 text-sm">{state?.error?.confirmNewPassword}</p>}
                    {state?.error?.passwordMismatch && <p className="text-red-500 text-sm">{state?.error?.passwordMismatch}</p>}
                    <input defaultValue={state?.data?.confirmNewPassword} type="password" name="confirmNewPassword" id="confirmNewPassword"  className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring-blue-500" />
                </div>
                <button disabled={pending} type="submit" className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700">Change Password</button>
            </form>
            {state?.success && <p className="text-green-500 text-sm">Password changed successfully</p>}
        </div>
    );
}