import { getServerSession } from "next-auth/next";
import { redirect } from "next/navigation";
import { authOptions } from "@/lib/auth";
import Sidebar from "@/components/dashboard/Sidebar";
import ChatList from "@/components/dashboard/ChatList";
import ChatWindow from "@/components/dashboard/ChatWindow";
import { User, Chat } from "@/types";

// --- Mock API Functions ---
// In a real app, you would fetch this data from your MongoDB database.

async function fetchFriends(userId: string): Promise<User[]> {
    // Placeholder logic
    console.log("Fetching friends for user:", userId);
    return [
        {
            id: "2",
            name: "Jane Doe",
            email: "jane@example.com",
            status: "online",
        },
        {
            id: "3",
            name: "Peter Jones",
            email: "peter@example.com",
            status: "offline",
        },
    ];
}

async function fetchChats(userId: string): Promise<Chat[]> {
    // Placeholder logic
    console.log("Fetching chats for user:", userId);
    return [
        {
            id: "chat1",
            participants: [{ id: "2", name: "Jane Doe" }],
            lastMessage: "Hey, how are you?",
            lastMessageTimestamp: "10:30 AM",
            unreadCount: 2,
        },
        {
            id: "chat2",
            participants: [{ id: "3", name: "Peter Jones" }],
            lastMessage: "See you tomorrow!",
            lastMessageTimestamp: "Yesterday",
            unreadCount: 0,
        },
    ];
}

export default async function Dashboard() {
    const session = await getServerSession(authOptions);

    if (!session || !session.user) {
        redirect("/auth/signin?callbackUrl=/dashboard");
    }

    const currentUser: User = {
        id: session.user.id,
        name: session.user.name,
        email: session.user.email,
        image: session.user.image,
        status: "online",
    };

    // Fetch initial data on the server
    const friends = await fetchFriends(currentUser.id);
    const chats = await fetchChats(currentUser.id);

    return (
        <div className="grid grid-cols-12 h-screen w-full bg-neutral-900 text-white">
            <Sidebar user={currentUser} friends={friends} />
            <div className="col-span-12 md:col-span-9 flex flex-col">
                <ChatList initialChats={chats} />
                <ChatWindow />
            </div>
        </div>
    );
}
