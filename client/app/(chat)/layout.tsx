import React from 'react'
interface ChatLayoutProps {
    children: React.ReactNode

}
const ChatLayout: React.FC<ChatLayoutProps> = ({ children }) => {
  return <>{children}</>;
};

export default ChatLayout