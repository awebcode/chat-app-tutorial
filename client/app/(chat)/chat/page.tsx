import React from "react";
import ChatComponent from "./components/Chat";
interface ChatProps {
  searchParams: Promise<{
    username: string;
    userId: string;
    avatar: string;
    roomId: string;
  }>;
}
const ChatEndpoint = async ({ searchParams }: ChatProps) => {
  const resolvedSearchParams = await searchParams;

  return (
    <div>
      <ChatComponent searchParams={resolvedSearchParams} />
    </div>
  );
};

export default ChatEndpoint;
