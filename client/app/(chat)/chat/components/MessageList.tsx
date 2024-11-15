import React, { useEffect, useRef } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";
import type { Message } from "../types";
import moment from "moment";
export const MessageList = ({
    messages,
    currentUser,
}: {
    messages: Message[];
    currentUser: string;
}) => {
    const messagesEndRef = useRef<HTMLDivElement | null>(null);

   useEffect(() => {
     if (messagesEndRef.current) {
       messagesEndRef.current.scrollTop = messagesEndRef.current.scrollHeight;
     }
   }, [messages]);

    return (
      <div ref={messagesEndRef} className="overflow-y-auto h-[66vh]">
        <ul className="flex flex-col gap-6  h-full">
          {messages.map((msg) => (
            <li
              key={msg.id}
              className={cn(
                "flex items-start gap-3 px-4",
                msg.sender === currentUser
                  ? "justify-end text-right"
                  : "justify-start text-left"
              )}
            >
              {msg.sender !== currentUser && msg.sender && (
                <Avatar>
                  <AvatarImage src={msg.avatar || ""} />
                  <AvatarFallback>{msg.sender.charAt(0)}</AvatarFallback>
                </Avatar>
              )}
              <div
                className={cn(
                  "rounded-lg p-2 text-sm max-w-xs",
                  msg.sender === currentUser
                    ? "bg-blue-500 text-white"
                    : "bg-gray-200 text-gray-900"
                )}
              >
                <p>{msg.content}</p>
                <span className="text-xs">- {msg.sender}</span>
                <p className={`text-xs ${msg.sender === currentUser ? "text-right text-gray-200" : "text-left text-gray-500"}`}>
                  {moment(msg?.createdAt).fromNow()}
                </p>
              </div>
              {msg.sender === currentUser && (
                <Avatar>
                  <AvatarImage src={msg.avatar || ""} />
                  <AvatarFallback>Y</AvatarFallback>
                </Avatar>
              )}
            </li>
          ))}
        </ul>
      </div>
    );
};
