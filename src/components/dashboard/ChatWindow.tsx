"use client";

import React, { useState } from "react";
import { Chat, User } from "@/types";

interface ChatWindowProps {
    activeChat: Chat | null;
    currentUser: User;
}

const ChatWindow: React.FC<ChatWindowProps> = ({ activeChat, currentUser }) => {
    const [message, setMessage] = useState("");

    const handleSendMessage = (e: React.FormEvent) => {
        e.preventDefault();
        if (!message.trim() || !activeChat) return;

        console.log(`Sending message to chat ${activeChat.id}: ${message}`);
        // Here you would send the message through your WebSocket connection
        // ws.send(JSON.stringify({ chatId: activeChat.id, content: message }));

        setMessage("");
    };

    if (!activeChat) {
        return (
            <div className="hidden md:flex md:flex-col md:col-span-6 flex-1 bg-neutral-900">
                <div className="flex-1 flex justify-center items-center">
                    <div className="text-center">
                        <h3 className="text-2xl font-semibold text-gray-400">
                            Select a chat to start messaging
                        </h3>
                        <p className="text-gray-500 mt-2">
                            Your conversations will appear here.
                        </p>
                    </div>
                </div>
                <div className="p-4 border-t border-neutral-800">
                    <input
                        type="text"
                        placeholder="Type a message..."
                        className="w-full bg-neutral-800 border border-neutral-700 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-amber-500"
                    />
                </div>
            </div>
        );
    }

    const otherParticipant = activeChat.participants[0];

    return (
        <div className="hidden md:flex md:flex-col md:col-span-6 flex-1 bg-neutral-900">
            {/* Chat Header */}
            <div className="flex items-center p-4 border-b border-neutral-800">
                <img
                    src={otherParticipant.image || "/default-avatar.png"}
                    alt={otherParticipant.name || "User"}
                    className="w-10 h-10 rounded-full object-cover mr-4"
                />
                <h3 className="text-lg font-semibold text-white">
                    {otherParticipant.name}
                </h3>
            </div>

            {/* Message Area */}
            <div className="flex-1 p-4 overflow-y-auto">
                {/* Messages would be rendered here */}
                <p className="text-center text-gray-500">
                    Chat history is not yet implemented.
                </p>
            </div>

            {/* Message Input */}
            <form
                onSubmit={handleSendMessage}
                className="p-4 border-t border-neutral-800"
            >
                <input
                    type="text"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Type a message..."
                    className="w-full bg-neutral-800 border border-neutral-700 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-amber-500"
                />
            </form>
        </div>
    );
};

export default ChatWindow;
