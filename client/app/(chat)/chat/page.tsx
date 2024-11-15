import React from "react";
import ChatComponent from "./components/Chat";
import type { ChatProps } from "./types";

const ChatEndpoint = async({ searchParams }: ChatProps) => {
  return (
    <div>
      <ChatComponent searchParams={await searchParams}  />
    </div>
  );
};

export default ChatEndpoint;
