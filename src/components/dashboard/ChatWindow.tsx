"use client";

import React, { useEffect, useMemo, useRef, useState } from "react";
import { Chat, User } from "@/types";
import { useWebSocket } from "@/contexts/WebSocketContext";

interface ChatWindowProps {
    activeChat: Chat | null;
    currentUser: User;
}

const ChatWindow: React.FC<ChatWindowProps> = ({ activeChat, currentUser }) => {
    const [message, setMessage] = useState("");
    const { messages, sendMessage, isConnected } = useWebSocket();
    const bottomRef = useRef<HTMLDivElement>(null);

    const otherParticipant = useMemo(() => activeChat?.participants[0] || null, [activeChat]);

    // Filter messages for this conversation (currentUser <-> otherParticipant)
    const conversationMessages = useMemo(() => {
        if (!otherParticipant) return [] as Array<{ from?: string; to?: string; content?: string; timestamp?: string }>;
        return messages.filter(
            (m) =>
                (m.from === currentUser.id && m.to === otherParticipant.id) ||
                (m.from === otherParticipant.id && m.to === currentUser.id)
        );
    }, [messages, currentUser.id, otherParticipant]);

    useEffect(() => {
        bottomRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [conversationMessages.length]);

    const handleSendMessage = (e: React.FormEvent) => {
        e.preventDefault();
        if (!message.trim() || !activeChat || !otherParticipant) return;

        sendMessage({ to: otherParticipant.id, content: message.trim() });
        setMessage("");
    };

    if (!activeChat) {
        return (
            <div className="flex flex-col flex-1 bg-neutral-900">
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
                    <div className="flex gap-2">
                        <input
                            type="text"
                            placeholder="Type a message..."
                            className="flex-1 bg-neutral-800 border border-neutral-700 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-amber-500"
                            disabled
                        />
                        <button
                            className="px-5 py-3 bg-amber-600 hover:bg-amber-500 text-white rounded-lg disabled:opacity-50"
                            disabled
                        >
                            Send
                        </button>
                    </div>
                </div>
            </div>
        );
    }

    const op = otherParticipant!;

    return (
        <div className="hidden md:flex md:flex-col md:col-span-6 flex-1 bg-neutral-900">
            {/* Chat Header */}
            <div className="flex items-center p-4 border-b border-neutral-800">
                <img
                    src={op.image || "/default-avatar.png"}
                    alt={op.name || "User"}
                    className="w-10 h-10 rounded-full object-cover mr-4"
                />
                <h3 className="text-lg font-semibold text-white">
                    {op.name}
                </h3>
            </div>

            {/* Message Area */}
            <div className="flex-1 p-4 overflow-y-auto space-y-4">
                {conversationMessages.length === 0 ? (
                    <p className="text-center text-gray-500">No messages yet. Say hello!</p>
                ) : (
                    conversationMessages.map((m, idx) => {
                        const isMine = m.from === currentUser.id;
                        const sender = isMine ? currentUser : op;
                        return (
                            <div key={idx} className={`flex items-start gap-3 ${isMine ? "justify-end" : "justify-start"}`}>
                                {!isMine && (
                                    <img
                                        src={sender.image || "/default-avatar.png"}
                                        alt={sender.name || sender.email || "User"}
                                        className="w-9 h-9 rounded-full object-cover mt-1"
                                    />
                                )}
                                <div className={`max-w-[70%]`}
                                >
                                    <div className={`text-xs font-semibold mb-1 ${isMine ? "text-amber-400 text-right" : "text-gray-300"}`}>
                                        {sender.name || sender.email || (isMine ? "You" : "User")}
                                    </div>
                                    <div className={`${isMine ? "bg-amber-600 text-white" : "bg-neutral-800 text-white"} px-4 py-2 rounded-2xl ${isMine ? "rounded-br-none ml-auto" : "rounded-bl-none"}`}>
                                        <p className="text-sm whitespace-pre-wrap break-words">{m.content}</p>
                                        {m.timestamp && (
                                            <p className="text-[10px] opacity-70 text-right mt-1">
                                                {new Date(m.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                            </p>
                                        )}
                                    </div>
                                </div>
                                {isMine && (
                                    <img
                                        src={sender.image || "/default-avatar.png"}
                                        alt={sender.name || sender.email || "You"}
                                        className="w-9 h-9 rounded-full object-cover mt-1"
                                    />
                                )}
                            </div>
                        );
                    })
                )}
                <div ref={bottomRef} />
            </div>

            {/* Message Input */}
            <form onSubmit={handleSendMessage} className="p-4 border-t border-neutral-800">
                <div className="flex gap-2">
                    <input
                        type="text"
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        placeholder={`Message ${op.name || op.email || "user"}...`}
                        className="flex-1 bg-neutral-800 border border-neutral-700 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-amber-500 disabled:opacity-60"
                        disabled={!isConnected}
                    />
                    <button
                        type="submit"
                        disabled={!message.trim() || !isConnected}
                        className="px-5 py-3 bg-amber-600 hover:bg-amber-500 text-white rounded-lg disabled:opacity-50"
                    >
                        Send
                    </button>
                </div>
                {!isConnected && (
                    <p className="mt-2 text-xs text-gray-400">Connecting… click a friend to start a chat.</p>
                )}
            </form>
        </div>
    );
};

export default ChatWindow;
