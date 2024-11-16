import React, { useRef } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import type { Socket } from "socket.io-client";
import type { User } from "../types";

export const MessageInput = ({
  message,
  setMessage,
  onSend,
  socket,
  roomId,
  userInfo,
}: {
  message: string;
  setMessage: (val: string) => void;
  onSend: () => void;
  socket: Socket;
  roomId: string;
  userInfo: User;
}) => {
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const typingTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const { username, userId, avatar } = userInfo;
  const typingData = {
    roomId,
    username,
    userId,
    avatar,
  };

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newMessage = e.target.value;
    setMessage(newMessage);

    // Clear any existing timeouts
    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }
    if (typingTimeoutRef.current) {
      clearTimeout(typingTimeoutRef.current);
    }

    // Trigger the typing event immediately
    if (newMessage.trim() !== "") {
      socket.emit("start_typing", typingData);
    }

    const delay = 2000;

    // Set a timeout to stop typing after a period of inactivity
    typingTimeoutRef.current = setTimeout(() => {
      socket.emit("stop_typing", typingData);
    }, delay);
  };

  const handleSend = () => {
    // Emit stop typing immediately when sending the message
    if (typingTimeoutRef.current) {
      clearTimeout(typingTimeoutRef.current);
    }
    socket.emit("stop_typing", typingData);

    onSend(); // Call the onSend prop to handle the message sending logic
  };

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        handleSend();
      }}
      className="flex items-end gap-2 w-full"
    >
      <Textarea
        placeholder="Type a message..."
        value={message}
        onChange={handleChange}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            e.preventDefault();
            handleSend();
          }
        }}
        className="resize-none"
      />
      <Button onClick={handleSend} className="">
        Send 🚀
      </Button>
    </form>
  );
};
