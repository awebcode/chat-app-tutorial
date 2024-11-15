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
  const timerRef = useRef<NodeJS.Timer | null>(null);
  const typingTimeoutRef = useRef<NodeJS.Timer | null>(null);
  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setMessage(e.target.value);
    // Clear any existing timeouts to reset the timer
    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }
    const { username, userId, avatar } = userInfo;
    const typingData = {
      roomId,
      username,
      userId,
      avatar,
    };

    // Trigger the typing event immediately when the user starts typing
    if (message.trim() !== "") {
      if (typingTimeoutRef.current) {
        clearTimeout(typingTimeoutRef.current);
      }

      // Emit start typing event if it's not already triggered
      socket.emit("start_typing", typingData);
    }
    const delay = 2000;

    // Set a timeout to stop typing after a period of inactivity
    //     // Set a timeout to stop typing after a period of inactivity
    typingTimeoutRef.current = setTimeout(() => {
      if (message.trim() === "") {
        // If the message is empty, stop typing
        socket.emit("stop_typing", typingData);
      } else {
        // Otherwise, stop typing after the timeout
        socket.emit("stop_typing", typingData);
      }
    }, delay); // Stop typing after 1000ms of inactivity
  };

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        onSend();
      }}
      className="flex  items-end  gap-2 w-full"
    >
      <Textarea
        placeholder="Type a message..."
        value={message}
        onChange={handleChange}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            e.preventDefault();
            onSend();
          }
        }}
        className="resize-none"
      />
      <Button onClick={onSend} className="">Send 🚀</Button>
    </form>
  );
};
