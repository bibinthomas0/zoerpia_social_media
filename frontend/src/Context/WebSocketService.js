import React, { useState, useEffect,createContext, useContext,useRef } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import ReconnectingWebSocket from 'reconnecting-websocket';






const baseURL = "http://127.0.0.1:8002";
const REACT_APP_CLOUDINARY_CLOUD_NAME = "dvlpq6zex";
const NotificationContext = createContext();



export const NotificationProvider = ({ children })=> {
  const authentication_user = useSelector((state) => state.authentication_user);
  const [socket, setSocket] = useState(null);
  const [userId,setUserId] = useState("")
  const [Notification, setNotification] = useState("");
  const [unread_msg,setUnread_msg] = useState([])
  const [msg_accept,setMsg_accept] = useState(false)

  const SocketManagement = () => {
    if (authentication_user.name) {
      // if (socket) {
      //   socket.close();
      //   console.log("Previous WebSocket disconnected");
      // }
      const newSocket = new ReconnectingWebSocket(
        `ws://localhost:8002/ws/notify/${authentication_user.name}/`
      );
      setSocket(newSocket);
      newSocket.onopen = () => console.log("WebSocket connected");
      newSocket.onclose = () => {
        console.log("WebSocket disconnected");
      };   
      return () => {

        newSocket.close();

      };
    }
  };

  useEffect(() => {
    SocketManagement();
  }, []);
  
  useEffect(() => {
    if (socket) {
      const handleMessage = (event) => {
        const data = JSON.parse(event.data);
        if (data.unread_messages) {
          setUnread_msg(data.unread_messages)

        } 
        if(data){
          console.log(data);
          setNotification(data);
        }
        if(data.type === 'chat_notification'){
          console.log('chat got')
          setMsg_accept(true)
        }
      };
  
      socket.onmessage = handleMessage;
  

    }
  }, [socket]);
  useEffect(() => {
if(msg_accept===true){
  SocketManagement()
}
  }, [msg_accept]);
  

  return (
<NotificationContext.Provider
      value={{
        socket,
        unread_msg,
        Notification,
        msg_accept,

        SocketManagement
      }}
    >
      {children}
    </NotificationContext.Provider>




  )
}
export const useNotification = () => {
  return useContext(NotificationContext);
};