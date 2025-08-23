import { getServerSession } from "next-auth/next";
import { redirect } from "next/navigation";
import { authOptions } from "@/lib/auth";

export default async function Dashboard() {
    const session = await getServerSession(authOptions);

    if (!session) {
        // The `redirect` function throws a special error that Next.js will catch
        // to perform a server-side redirect. It does not return a value.
        // For more info, see: https://nextjs.org/docs/app/api-reference/functions/redirect
        redirect("/auth/signin?callbackUrl=/dashboard");
    }

    return (
        <div className="flex justify-center items-center min-h-screen">
            <p className="text-white text-lg">
                Welcome to your dashboard,{" "}
                {session.user?.name || session.user?.email}!
            </p>
        </div>
    );
}
