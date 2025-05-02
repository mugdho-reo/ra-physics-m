import { auth } from "@/auth";
import { redirect } from "next/navigation";

export default async function AdminPage() {
    const user = await auth();
    const isLoggedIn = !!user;
    if (!isLoggedIn) {
        redirect("/api/auth/signin?callbackUrl=/admin");
    }
    return (
        <div className="flex flex-col items-center justify-center min-h-screen py-2">
            <h1 className="text-3xl font-bold">Admin Page</h1>
            <p className="mt-4 text-lg">This is the admin page.</p>
        </div>
    );
}