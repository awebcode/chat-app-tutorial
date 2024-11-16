"use client";

import React, { useState, useEffect } from "react";
import useSocket from "@/hooks/use-socket";
import { ChatHeader } from "./ChatHeader";
const Empty = dynamic(() => import("./Empty"), { ssr: false,loading: () => <MessageListSkeleton/> });
const MessageList=dynamic(() => import("./MessageList").then((mod) => mod.MessageList), { ssr: false,loading: () => <MessageListSkeleton/> });
import { MessageInput } from "./MessageInput";
import TypingIndicator from "./TypingIndicator";
import type { Message, User, ChatProps } from "../types";
import { useRouter } from "next/navigation";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import dynamic from "next/dynamic";
import { MessageListSkeleton } from "./MessageListSkeleton";
const ChatComponent: React.FC<ChatProps> = ({ searchParams }) => {
  const router = useRouter();
  const [messages, setMessages] = useState<Message[]>([]);
  const [onlineUsers, setOnlineUsers] = useState<User[]>([]);
  const [message, setMessage] = useState("");
  const [typing, setTyping] = useState<User | null>(null);
  const [typingUsers, setTypingUsers] = useState<User[]>([]);
  const socket = useSocket(process.env.NEXT_PUBLIC_SERVER_URL!); // Replace with your server URL
  const { roomId, username, userId, avatar } = searchParams;
  useEffect(() => {
    socket.on("receive_message", (msg: Message) => {
      setMessages((prev) => [...prev, msg]);
    });

    socket.on("room_data", (data: { messages: Message[]; onlineUsers: User[] }) => {
      setMessages(data.messages || []);
      setOnlineUsers(data.onlineUsers || []);
    });

    socket.on("typing", (data) => {
      setTyping(data.user);
      setTypingUsers(data.typingUsers);
    });
    socket.on("stop_typing", (data) => {
      setTyping(null);
      setTypingUsers(data.typingUsers);
    });

    return () => {
      socket.off("receive_message");
      socket.off("room_data");
      socket.off("typing");
      socket.off("stop_typing");
    };
  }, [socket]);

  useEffect(() => {
    if (!roomId || !username) router.push(`/`);
    socket.emit("join_room", roomId, { username, userId, avatar });
  }, [socket, router, roomId, username, userId, avatar]);

  const sendMessage = () => {
    if (!message.trim() || !roomId) return;
    const data = {
      id: Date.now(),
      content: message,
      sender: username,
      senderId: userId,
      roomId,
      avatar,
      createdAt: new Date(),
    };
    socket.emit("send_message",data);
    setMessages((prev) => [...prev, data]);
    setMessage("");
  };
  return (
    <div className="container flex flex-col justify-between items-center min-h-screen py-6">
      <Card className="w-full max-w-7xl p-4 shadow-lg h-full ">
        <CardHeader>
          <ChatHeader
            roomId={roomId}
            onlineUsers={onlineUsers}
            user={{ username, userId, avatar, socketId: "" }}
            onLeave={() => {
              if (window.confirm("Are you sure you want to leave the room?"))
                router.push(`/`);
            }}
          />
          {/* <CardDescription>Send and receive messages in real-time.</CardDescription> */}
        </CardHeader>
        <CardContent className="flex flex-col min-h-[60vh]">
          {messages.length > 0 ? (
            <>
              {" "}
              <MessageList messages={messages} currentUser={username} />
            </>
          ) : (
            <Empty />
          )}
          {typingUsers?.length > 0 && typing?.userId !== userId && (
            <TypingIndicator typingUsers={typingUsers} currentUserId={userId} />
          )}{" "}
        </CardContent>
        <CardFooter>
          <MessageInput
            message={message}
            setMessage={setMessage}
            onSend={sendMessage}
            socket={socket}
            roomId={roomId}
            userInfo={{ username, userId, avatar, socketId: "" }}
          />
        </CardFooter>
      </Card>
      {/* <OnlineUsersDialog users={onlineUsers} onClose={() => {}} /> */}
    </div>
  );
};

export default ChatComponent;
