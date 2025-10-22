import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "@/lib/auth";
import connectDB from "@/lib/db";
import Sidebar from "@/components/dashboard/Sidebar";
import ChatList from "@/components/dashboard/ChatList";
import ChatWindow from "@/components/dashboard/ChatWindow";
import { User as UserType } from "@/types";
import { fetchFriends, fetchChats, fetchPendingRequests } from "@/lib/data";

export default async function Dashboard() {
    await connectDB();
    const session = await getServerSession(authOptions);

    if (!session || !session.user) {
        redirect("/auth/signin?callbackUrl=/dashboard");
    }

    const currentUser: UserType = {
        id: session.user.id,
        name: session.user.name,
        email: session.user.email,
        image: session.user.image,
        status: "online", // Placeholder
    };

    // Fetch initial data on the server
    const [friends, chats, pendingRequests] = await Promise.all([
        fetchFriends(currentUser.id),
        fetchChats(currentUser.id),
        fetchPendingRequests(currentUser.id),
    ]);

    return (
        <div className="grid grid-cols-12 h-screen w-full bg-neutral-900 text-white">
            <Sidebar
                user={currentUser}
                friends={friends}
                initialPendingRequests={pendingRequests}
            />
            <div className="col-span-12 md:col-span-9 flex flex-col">
                <ChatList initialChats={chats} />
                <ChatWindow />
            </div>
        </div>
    );
}
