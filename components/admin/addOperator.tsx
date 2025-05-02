'use client';

import { addOperatorAction } from "@/actions/admin/adminActions";

import { useActionState } from "react";

export function AddOperator() {
    const [state, action, pending] = useActionState(addOperatorAction, undefined)
    return (

        <div className="container mx-auto p-4 md:p-8 lg:p-12">
            <h1 className="text-3xl font-bold text-gray-800 mb-6">Add Operator</h1>
            <form action={action} className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                <div>
                    <label htmlFor="mobile" className="block text-sm font-medium text-gray-700">Mobile Number</label>
                    {/* {state?.error?. && <p className="text-red-500 text-sm">{state.error.mobile}</p>} */}
                    <input placeholder="e.g: 01785627098" type="text" name="mobile" id="mobile" className="mt-1 p-2 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500" />
                </div>
                <div>
                    <label htmlFor="confirmMobile" className="block text-sm font-medium text-gray-700">Confirm Mobile Number</label>
                    {/* {state?.error?.confirmMobile && <p className="text-red-500 text-sm">{state.error.confirmMobile}</p>} */}
                    {/* {state?.error?.mobileMismatch && <p className="text-red-500 text-sm">{state.error.mobileMismatch}</p>} */}
                    <input placeholder="e.g: 01785627098" type="text" name="confirmMobile" id="confirmMobile" className="mt-1 p-2 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500" />
                </div>
                <div className="md:col-span-2 lg:col-span-3">
                    <p className="text-sm text-gray-500">A password will be messaged to the provided number.</p>
                </div>
                <div className="md:col-span-2 lg:col-span-3">
                    <button type="submit" disabled={pending} className="px-6 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50">Add Operator</button>
                </div>
            </form>
        </div>
    );
}