"use client";

import React, { useState, useEffect } from "react";
import { User, Friend, Chat, FriendRequest } from "@/types";
import Sidebar from "./Sidebar";
import ChatList from "./ChatList";
import ChatWindow from "./ChatWindow";

interface DashboardClientProps {
    user: User;
    friends: Friend[];
    initialPendingRequests: FriendRequest[];
    initialChats: Chat[];
}

export default function DashboardClient({
    user,
    friends,
    initialPendingRequests,
    initialChats,
}: DashboardClientProps) {
    const [activeChat, setActiveChat] = useState<Chat | null>(null);
    const [chats, setChats] = useState<Chat[]>(initialChats);

    // This is a placeholder for a real WebSocket connection
    useEffect(() => {
        if (activeChat) {
            console.log(
                `Connecting to WebSocket for chat with ${activeChat.participants[0].name}`
            );
            const ws = new WebSocket("ws://localhost:8080"); // Connect to our local server

            ws.onopen = () => {
                console.log("WebSocket connection established.");
                ws.send(`Hello from ${user.name}!`);
            };

            ws.onmessage = (event) => {
                console.log("Received message:", event.data);
                // Here you would handle incoming messages and update the chat state
            };

            ws.onclose = () => {
                console.log("WebSocket connection closed.");
            };

            // Clean up the connection when the component unmounts or activeChat changes
            return () => {
                ws.close();
            };
        }
    }, [activeChat, user.name]);

    const handleSelectFriend = (friend: Friend) => {
        // Find if a chat with this friend already exists
        const existingChat = chats.find((chat) =>
            chat.participants.some((p) => p.id === friend.id)
        );

        if (existingChat) {
            setActiveChat(existingChat);
        } else {
            // Create a new local chat object. In a real app, you'd likely create this on the server.
            const newChat: Chat = {
                id: `new_${friend.id}_${Date.now()}`, // Temporary unique ID
                participants: [friend],
                lastMessage: `Started a chat with ${friend.name}`,
                lastMessageTimestamp: new Date().toLocaleTimeString(),
                unreadCount: 0,
            };
            setChats((prev) => [newChat, ...prev]);
            setActiveChat(newChat);
        }
    };

    return (
        <div className="grid grid-cols-12 h-screen w-full bg-neutral-900 text-white">
            <Sidebar
                user={user}
                friends={friends}
                initialPendingRequests={initialPendingRequests}
                onSelectFriend={handleSelectFriend}
            />
            <div className="col-span-12 md:col-span-9 flex flex-col">
                <ChatList initialChats={chats} onSelectChat={setActiveChat} />
                <ChatWindow activeChat={activeChat} currentUser={user} />
            </div>
        </div>
    );
}
