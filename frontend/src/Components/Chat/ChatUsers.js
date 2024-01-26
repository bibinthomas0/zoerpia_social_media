import { Stack, HStack, VStack,StackDivider,Box,Avatar,AvatarBadge,Spacer,Flex,Text } from '@chakra-ui/react'
import React, { useState,useEffect } from "react";
import axios from 'axios'
import { useSelector } from 'react-redux';
import UserChatBox from './UserChatBox';
import { useContext } from 'react';
import {
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBCard,
  MDBCardBody,
  MDBIcon,
  MDBTypography,
  MDBInputGroup,
  MDBScrollbar,
} from "mdb-react-ui-kit";
import ChatuserList from './small/ChatuserList';
import { useLocation } from "react-router-dom";
import { ChatSelectContext } from '../../Context/ChatSelectContext';



const baseURL='http://127.0.0.1:8002'
const REACT_APP_CLOUDINARY_CLOUD_NAME = "dvlpq6zex";
const ChatUsers = () => {
  const authentication_user = useSelector((state) => state.authentication_user);
  const { selectedChat, setSelectedChat } = useContext(ChatSelectContext);
  const [chatRooms,setChatrooms] = useState([])
  
  const location = useLocation();
  const [newChat,SetNewChat]= useState("")
  const datas = location.state;


const CheckData = ()=>{
  if(datas){
    console.log(datas)
    SetNewChat(datas.username)
    setSelectedChat(datas.username)
  }

}
useEffect(()=>{
  CheckData()
})


  const ChatroomList = async () => {
    try {
      console.log('ddddddddddddddddddddd',authentication_user.name);
      var data = { 'username': authentication_user.name };
      const res = await axios.post(baseURL + "/api/chat/chatrooms/", data);
  
      if (res.status === 200) {

        setChatrooms(res.data);
        if(selectedChat!==newChat){
          SetNewChat("")
        }
        console.log('fffffffffffffffff');
      } else {
        console.log("Error on postlist");
      }
    } catch (error) {
      console.error("An error occurred while fetching chat rooms:", error);
    }
  };

  
useEffect(() => {
  ChatroomList()    
}, [selectedChat]);




  return (
    <MDBContainer md="6" lg="5" xl="4" className="mb-4 mb-md-0 border-right">
    <div className="p-3">
      <MDBInputGroup className="rounded mb-3">
        <input
          className="form-control rounded"
          placeholder="Search"
          type="search"
        />
        <span
          className="input-group-text border-0"
          id="search-addon"
        >
          <MDBIcon fas icon="search" />
        </span>
      </MDBInputGroup>
        <MDBTypography listUnStyled className="mb-0">  
        {datas && <ChatuserList key={null} name={selectedChat} online={null} new={true} /> }     
        {chatRooms && chatRooms.map((room) => (
  <ChatuserList key={room.id} name={room.username} online={room.is_online} />
))}  

        </MDBTypography>
    
    </div>
  </MDBContainer>
  )
};

export default ChatUsers;
