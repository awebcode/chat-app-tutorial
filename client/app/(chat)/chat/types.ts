export interface ChatProps {
  searchParams: {
    username: string;
    userId: string;
    avatar: string;
    roomId: string;
  };
}

export interface Message {
  id: number;
  roomId: string;
  content: string;
  senderId?: string;
  sender?: string; // Simulate user
  avatar?: string; // URL for user avatar
  createdAt?: Date;
}

export type User = {
  userId: string;
  socketId: string;
  username: string;
  avatar: string;
};