export interface User {
  id: number;
  name: string;
  avatar: string;
  lastMessage?: string;
  lastMessageTime?: string;
}

export interface Message {
  id: number;
  senderId: number;
  text: string;
  timestamp: string;
}