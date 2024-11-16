import React, { useEffect, useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import type { User } from "../types";

const TypingIndicator = ({
  typingUsers,
  currentUserId,
}: {
  typingUsers: User[];
  currentUserId: string;
  }) => {
  const [additionalTypingUsers, setAdditionalTypingUsers] = useState<number>(0);
  const DISPLAY_USERS_COUNT = 5;
  useEffect(() => {
    if (typingUsers.length > DISPLAY_USERS_COUNT) {
      setAdditionalTypingUsers(typingUsers.length - DISPLAY_USERS_COUNT);
    } else {
      setAdditionalTypingUsers(0);
    }
  }, [typingUsers]);

  // Filter out duplicate users based on `userId`
  const filteredTypingUsers = typingUsers
    .slice(0, DISPLAY_USERS_COUNT)
    .filter((user) => user.userId !== currentUserId); // Exclude current user
 
  return (
    <div className="flex items-center space-x-2">
      {/* Display avatars of typing users */}
      {filteredTypingUsers.map((typingUser) => (
        <div key={typingUser.userId} className={`flex`}>
          {typingUser.userId && (
            <div className="relative h-8 w-8 md:h-10 md:w-10">
              <Avatar className="h-6 w-6">
                <AvatarImage src={typingUser.avatar || ""} />
                <AvatarFallback>{typingUser.username?.charAt(0)}</AvatarFallback>
              </Avatar>
              <span className="text-xs">{typingUser.username}</span>
              <span className="absolute bottom-0 right-0 p-1 bg-green-500 rounded-full"></span>
            </div>
          )}
        </div>
      ))}

      {/* Display how many more users are typing */}
      {additionalTypingUsers > 0 && (
        <div className="text-sm text-gray-500 ml-2">
          <span>{`${additionalTypingUsers} more are typing`}</span>
        </div>
      )}
      {filteredTypingUsers.length > 0 && (
        <div className="ml-3 flex items-center space-x-1">
          <div className="flex space-x-1">
            <div className="typingIndicatorBubble">
              <div className="typingIndicatorBubbleDot"></div>
              <div className="typingIndicatorBubbleDot"></div>
              <div className="typingIndicatorBubbleDot"></div>
            </div>
          </div>
        </div>
      )}
      {/* Typing indicator with dots animation */}
    </div>
  );
};

export default TypingIndicator;
