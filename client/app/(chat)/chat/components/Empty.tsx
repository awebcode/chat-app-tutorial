import { Button } from '@/components/ui/button';
import React from 'react'

const Empty = () => {
  return (
    <div className="flex flex-col items-center justify-center h-full bg-gray-50 p-6 text-center">
      <div className="flex items-center justify-center w-24 h-24 bg-blue-100 rounded-full">
        <svg
          className="w-12 h-12 text-blue-500"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M17 8h2a2 2 0 012 2v10a2 2 0 01-2 2H5a2 2 0 01-2-2V10a2 2 0 012-2h2m10-4H7a2 2 0 00-2 2v2h14V6a2 2 0 00-2-2z"
          />
        </svg>
      </div>
      <h2 className="mt-4 text-sm font-semibold text-gray-700">No Messages Yet</h2>
      <p className="mt-2 text-gray-500 text-xs">
        Start a conversation by sending a message or joining a chat room!
      </p>
      <Button className="mt-4">
        Start Messaging
      </Button>
    </div>
  );
}

export default Empty