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
  
  // useEffect(() => {
  //   if (socket) {
  //     socket.onmessage = (event) => {
  //       const data = JSON.parse(event.data);
  //       if (data.unread_messages) {
  //         console.log(data.unread_messages);
  //       } else if (data.notification){
  //         console.log(data.notification)
          
  //       }
  //     };
  //   }
  // }, [socket]);






  return (
<NotificationContext.Provider
      value={{
        socket,
        Notification,
        unread_msg,
        setUnread_msg,
        setNotification
       
      }}
    >
      {children}
    </NotificationContext.Provider>




  )
}
export const useNotification = () => {
  return useContext(NotificationContext);
};