import React, { useContext, useState, useEffect } from "react";
import NotifyComp from "../../Notification/NotifyComp";
import axios from 'axios';
import {useSelector} from "react-redux";
import { Box, Center, Container } from "@chakra-ui/react";
import { useNotification } from "../../../Context/WebSocketService";

const baseURL = "http://127.0.0.1:8001";
const ThirdSection = () => {
  const { socket, unread_msg,Notification,msg_accept} = useNotification();
  const authentication_user = useSelector((state) => state.authentication_user);
  const [notes, setNotes] = useState([]);


  useEffect(() => {
    console.log(Notification)
    GetNotifications()
  }, [Notification]);


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




return (
  <Container   marginBottom={'4'}  overflow="auto"  sx={{
    '&::-webkit-scrollbar': {
      width: '5px', 
    },
    '&::-webkit-scrollbar-thumb': {
      backgroundColor: 'transparent',
    },
  }} Height="820px"
  padding={'1%'}   >
    {notes.length === 0 ? (
      <Container overflow="auto"  sx={{
        '&::-webkit-scrollbar': {
          width: '5px', 
        },
        '&::-webkit-scrollbar-thumb': {
          backgroundColor: 'transparent',
        },
      }}> <Center paddingTop={'50%'}>No Notifications....</Center>  </Container>
    ) : (
      notes.map((data) => (
        <NotifyComp
          key={data.id} 
          user={data.user}
          notification_type={data.notification_type}
          time={data.created_at}
          post_id={data.post_id} 
          by_user={data.by_user}
          comment={data.comment}
        />
      ))
     )} 
  </Container>
);

};

export default ThirdSection;
