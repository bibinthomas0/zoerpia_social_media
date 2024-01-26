// WebSocketContext.js
import React, { createContext, useContext, useState } from "react";

const WebSocketContext = createContext();

export const WebSocketProvider = ({ children }) => {
  const [socket, setSocket] = useState(null);

  const connectWebSocket = (url) => {
    const newSocket = new WebSocket(url);
    setSocket(newSocket);

    newSocket.onopen = () => console.log("WebSocket connected");
    newSocket.onclose = () => console.log("WebSocket disconnected");

    return newSocket;
  };

  return (
    <WebSocketContext.Provider value={{ socket, connectWebSocket }}>
      {children}
    </WebSocketContext.Provider>
  );
};

export const useWebSocket = () => {
  return useContext(WebSocketContext);
};
