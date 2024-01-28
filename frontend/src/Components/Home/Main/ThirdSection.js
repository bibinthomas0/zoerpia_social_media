import React, { useContext, useState, useEffect } from "react";
import NotifyComp from "../../Notification/NotifyComp";
import axios from 'axios';
import {useSelector} from "react-redux";
import { Box, Center, Container } from "@chakra-ui/react";
import { useNotification } from "../../../Context/WebSocketService";

const baseURL = "http://127.0.0.1:8001";
const ThirdSection = () => {
  const { socket, Notification,setNotification,unread_msg,setUnread_msg } = useNotification();
  const authentication_user = useSelector((state) => state.authentication_user);
  const [notes, setNotes] = useState([]);

  useEffect(() => {
    if (socket) {
      socket.onmessage = (event) => {

        const data = JSON.parse(event.data);
        if (data.unread_messages) {
          setUnread_msg(data.unread_messages);
          console.log(data.unread_messages);
        } else if (data.notification){
          setNotification(data.notification)
          
        }
      };
    } 
  }, [socket]);

  // useEffect(() => {
  //   console.log(Notification)
  // }, [Notification]);

  const GetNotifications = async ()=>{
console.log('calledd')
    try {
        const userId = authentication_user.name; 
const res = await axios.get(baseURL + '/api/home/notifylist/', {
  params: { user_id: userId },
});
  
        if (res.status === 200) {
          const parsedData = JSON.parse(res.data)
        
// console.log('gggggggg',parsedData)
          setNotes(parsedData);  
        } 
      } catch (error) {
        console.error('Error fetching comments:', error);
      }

}
useEffect(() => { 
              
    GetNotifications() 
    
     
}, [socket]);



return (
  <Box   marginBottom={'4'}  overflow="auto"  sx={{
    '&::-webkit-scrollbar': {
      width: '5px', 
    },
    '&::-webkit-scrollbar-thumb': {
      backgroundColor: 'transparent',
    },
  }} Height="100vh"
  padding={'1%'}   >
    {notes.length === 0 ? (
      <Container> <Center paddingTop={'50%'}>No Notifications....</Center>  </Container>
    ) : (
      notes.map((data) => (
        <NotifyComp
          key={data.id} 
          user={data.user}
          notification_type={data.notification_type}
          post_id={data.post_id} 
          by_user={data.by_user}
          comment={data.comment}
        />
      ))
     )} 
  </Box>
);

};

export default ThirdSection;
