import React, { useContext, useState, useEffect } from "react";
import NotifyComp from "../../Notification/NotifyComp";
import axios from 'axios';
import {useSelector} from "react-redux";
import { Box, Center, Container,Flex } from "@chakra-ui/react";
import { useNotification } from "../../../Context/WebSocketService";

const baseURL = "http://127.0.0.1:8001";
const ThirdSection = () => {
  const { socket, unread_msg,Notification,msg_accept} = useNotification();
  const authentication_user = useSelector((state) => state.authentication_user);
  const [notes, setNotes] = useState([]);







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
      }}>
     <Flex style={{Height:"20px",backgroundColor:"blue"}}>hi
     <Box>   </Box>
     
     
     </Flex>
        
        
          </Container>
    ) : (
      <Center paddingTop={'50%'}>No users is online...</Center> 

     )} 
  </Container>
);

};

export default ThirdSection;
