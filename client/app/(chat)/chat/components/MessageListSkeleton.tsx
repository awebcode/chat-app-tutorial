import React from "react";
import { Skeleton } from "@/components/ui/skeleton";

export const MessageListSkeleton = () => {
  const skeletonMessages = Array(10).fill(null); // Array for generating multiple skeleton messages

  return (
    <div className="overflow-y-auto h-[66vh]">
      <ul className="flex flex-col gap-6 px-4 h-full">
        {skeletonMessages.map((_, index) => (
          <li
            key={index}
            className={`flex items-start gap-3 px-4 ${
              index % 2 === 0 ? "justify-start text-left" : "justify-end text-right"
            }`}
          >
            {/* Avatar Skeleton */}
            {index % 2 === 0 && <Skeleton className="h-10 w-10 rounded-full" />}

            {/* Message Bubble Skeleton */}
            <div
              className={`rounded-lg p-2 max-w-xs ${
                index % 2 === 0 ? "bg-gray-200" : "bg-blue-500 text-white"
              }`}
            >
              <Skeleton className="h-4 w-32 mb-2" />
              <Skeleton className="h-4 w-24 mb-1" />
              <Skeleton className="h-3 w-16" />
            </div>

            {/* Avatar Skeleton for current user */}
            {index % 2 !== 0 && <Skeleton className="h-10 w-10 rounded-full" />}
          </li>
        ))}
      </ul>
    </div>
  );
};
