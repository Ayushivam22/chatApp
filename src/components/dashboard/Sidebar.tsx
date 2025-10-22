"use client";

import React from "react";
import { User } from "@/types";
import AddFriendButton from "./AddFriendButton";

interface SidebarProps {
    user: User;
    friends: User[];
}

const Sidebar: React.FC<SidebarProps> = ({ user, friends }) => {
    return (
        <aside className="hidden md:flex md:flex-col md:col-span-3 bg-neutral-800 p-4 border-r border-neutral-700">
            {/* User Profile Section */}
            <div className="flex items-center gap-4 mb-6 p-2">
                <img
                    src={user.image || "/default-avatar.png"}
                    alt={user.name || "User Avatar"}
                    className="w-12 h-12 rounded-full object-cover"
                />
                <div>
                    <h2 className="font-semibold text-lg text-white">
                        {user.name || user.email}
                    </h2>
                    <p className="text-sm text-green-400 capitalize">{user.status}</p>
                </div>
            </div>

            {/* Add Friend Button */}
            <AddFriendButton />

            {/* Friends List */}
            <div className="flex-1 overflow-y-auto mt-4">
                <h3 className="text-md font-semibold text-gray-400 mb-2 px-2">
                    Friends
                </h3>
                <ul className="space-y-2">
                    {friends.map((friend) => (
                        <li
                            key={friend.id}
                            className="flex items-center gap-3 p-2 rounded-lg hover:bg-neutral-700 cursor-pointer transition-colors"
                        >
                            <div className="relative">
                                <img
                                    src={friend.image || "/default-avatar.png"}
                                    alt={friend.name || "Friend"}
                                    className="w-10 h-10 rounded-full object-cover"
                                />
                                {friend.status === "online" && (
                                    <span className="absolute bottom-0 right-0 block h-2.5 w-2.5 rounded-full bg-green-500 ring-2 ring-neutral-800"></span>
                                )}
                            </div>
                            <span className="font-medium text-gray-200">
                                {friend.name}
                            </span>
                        </li>
                    ))}
                </ul>
            </div>
        </aside>
    );
};

export default Sidebar;
