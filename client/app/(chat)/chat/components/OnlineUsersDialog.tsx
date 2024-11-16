import React from "react";
import { Dialog,  DialogContent, DialogTitle } from "@/components/ui/dialog";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import type { User } from "../types";

export const OnlineUsersDialog = ({
  users,
  onClose,
}: {
  users: User[];
  onClose: () => void;
}) => (
  <Dialog open onOpenChange={onClose}>
    <DialogTitle>
     Online Users ({users.length})
    </DialogTitle>
    <DialogContent>
      <ul className="mt-4 flex flex-col  gap-2 py-4">
        {users.map((user) => (
          <li
            key={user.userId}
            className="flex items-center    gap-2 p-2 bg-gray-200 w-ful"
          >
            <Avatar>
              <AvatarImage src={user.avatar || ""} />
              <AvatarFallback>{user.username.charAt(0)}</AvatarFallback>
            </Avatar>
            <span className="text-sm">{user.username}</span>
            <span className="ml-auto text-green-500 text-xs">● Online</span>
          </li>
        ))}
      </ul>
    </DialogContent>
  </Dialog>
);
