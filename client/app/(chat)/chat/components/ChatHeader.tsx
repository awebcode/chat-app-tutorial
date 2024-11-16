import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Info } from "lucide-react";
import type { User } from "../types";
import { OnlineUsersDialog } from "./OnlineUsersDialog";
import { ProfileDialog } from "./ProfileDialog";

export const ChatHeader = ({
  user,
  roomId,
  onlineUsers,
  onLeave,
}: {
  user: User;
  roomId: string;
  onlineUsers: User[];
  onLeave: () => void;
}) => {
  const [showOnlineUsers, setShowOnlineUsers] = useState(false);
  const [showUserInfo, setShowUserInfo] = useState(false);

  return (
    <div className="container flex  justify-between items-center w-full">
      <Button onClick={onLeave} variant="outline">
        <ArrowLeft className="mr-2 h-4 w-4" /> Leave
      </Button>
      <p className="flex">
        Chat Room{" "}
        <span className="text-blue-500 mx-2 flex">
          #{roomId} <Info className="ml-4" onClick={() => setShowUserInfo(true)} />
        </span>
      </p>

      <Button onClick={() => setShowOnlineUsers(true)}>
        Online Users: {onlineUsers.length}
      </Button>
      {showUserInfo && (
        <ProfileDialog user={user} onClose={() => setShowUserInfo(false)} />
      )}
      {showOnlineUsers && (
        <OnlineUsersDialog
          users={onlineUsers}
          onClose={() => setShowOnlineUsers(false)}
        />
      )}
    </div>
  );
};
