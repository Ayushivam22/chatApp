export interface User {
    id: string;
    name?: string | null;
    email?: string | null;
    image?: string | null;
    status?: "online" | "offline";
}

export interface Chat {
    id: string;
    participants: User[];
    lastMessage: string;
    lastMessageTimestamp: string;
    unreadCount: number;
}

export interface Message {
    id: string;
    sender: User;
    content: string;
    timestamp: string;
}
