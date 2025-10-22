"use client";

import React from "react";

const ChatWindow: React.FC = () => {
    // This component is currently a placeholder.
    // In a real app, it would receive an active chat ID and fetch/display messages.
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
            {/* Placeholder for message input */}
            <div className="p-4 border-t border-neutral-800">
                <input
                    type="text"
                    placeholder="Type a message..."
                    className="w-full bg-neutral-800 border border-neutral-700 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-amber-500"
                />
            </div>
        </div>
    );
};

export default ChatWindow;
