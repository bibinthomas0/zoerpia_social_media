import { useState, createContext } from "react";
export const ChatSelectContext = createContext();

const ChatSelect = ({ children }) => {
  const [selectedChat, setSelectedChat] = useState("");
  return (
    <ChatSelectContext.Provider value={{ selectedChat, setSelectedChat }}>
      {children}
    </ChatSelectContext.Provider>
  );
};

export default ChatSelect;
