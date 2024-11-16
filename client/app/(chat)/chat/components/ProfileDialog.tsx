import React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button"; // Assumes a Button component is available
import type { User } from "../types";

export const ProfileDialog = ({ user, onClose }: { user: User; onClose: () => void }) => (
  <Dialog open onOpenChange={onClose}>
    <DialogContent>
      <DialogHeader>
        <DialogTitle>
         Profile - {user.username}
          <p className="text-sm">#{user.userId}</p>
        </DialogTitle>
      </DialogHeader>
      <div className="flex flex-col items-center gap-4 mt-4">
        {/* User Avatar */}
        <Avatar className="h-20 w-20">
          <AvatarImage src={user.avatar || ""} />
          <AvatarFallback>{user.username.charAt(0)}</AvatarFallback>
        </Avatar>

        {/* User Details */}
        <div className="text-center">
          <h3 className="text-lg font-medium">{user.username}</h3>
        </div>

        {/* Additional Info */}
        <div className="flex flex-col gap-2 w-full text-sm text-gray-700">
          <div className="flex justify-between">
            <span className="font-medium">Status:</span>
            <span className="text-green-500">Online</span>
          </div>
        </div>
      </div>

      {/* Footer Actions */}
      <DialogFooter className="mt-4">
        <Button onClick={onClose} className="w-full">
          Close
        </Button>
      </DialogFooter>
    </DialogContent>
  </Dialog>
);
