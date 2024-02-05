import React, { useState,useEffect } from "react";
import axios from 'axios'
import { Box, Text } from "@chakra-ui/react";
import { Tabs, TabList, TabPanels, Tab, TabPanel } from '@chakra-ui/react'
import RecommendedPost from "../Home/Small/RecommendedPost";
import { useSelector } from "react-redux";
import NotifyComp from "../Notification/NotifyComp";
import { useNotification } from "../../Context/WebSocketService";



const baseURL='http://127.0.0.1:8001'

const NotificationSecond = () => {

    const { socket, unread_msg,Notification,msg_accept} = useNotification();
    const authentication_user = useSelector((state) => state.authentication_user);
    const [posts,setPosts] = useState([])
    const [loading,setloading] = useState(false)
    const [notes, setNotes] = useState([]);

    
  useEffect(() => {
    console.log(Notification)
    GetNotifications()
  }, [Notification]);
  
  const GetNotifications = async ()=>{
        try {
            const userId = authentication_user.name; 
    const res = await axios.get(baseURL + '/api/home/notifylist/', {
      params: { user_id: userId },
    });
            if (res.status === 200) {
              const parsedData = JSON.parse(res.data)
            
              setNotes(parsedData);  
            } 
          } catch (error) {
            console.error('Error fetching comments:', error);
          }
    
    }






    const Postlist = async () => {
      setloading(true)
      try {
        var data = { "userid": authentication_user.name };
        const res = await axios.get(baseURL + '/api/home/listpost/', { params: data });
        
        if (res.status === 200) {
          setPosts(res.data);
          setloading(false)
        }
      } catch (error) {
        console.error("Error fetching posts:", error);
        setloading(false)
      }
    };
    
    useEffect(() => {
      Postlist();
    }, [NotificationSecond]);
    
    
  
    return (<Box marginBottom={'4'}  overflow="auto"  sx={{
      '&::-webkit-scrollbar': {
        width: '5px', 
      },
      '&::-webkit-scrollbar-thumb': {
        backgroundColor: 'transparent',
      },
    }} 
    maxHeight="825px"
    padding={'1%'}
    >
  
  
  

      <Tabs isFitted variant='enclosed' marginTop={'2%'} >
    <TabList mb='1em' borderColor={'black'}>
      <Tab>Unread</Tab>
      <Tab>Read</Tab>
    </TabList>
    <TabPanels>
      <TabPanel>

   { notes.map((data) => {
  
      return (
        <NotifyComp
        key={data.id} 
        user={data.user}
        notification_type={data.notification_type}
        time={data.created_at}
        post_id={data.post_id} 
        by_user={data.by_user}
        comment={data.comment}
      />
      )

    })}

      </TabPanel>
      <TabPanel>
      <RecommendedPost/>
      </TabPanel>
    </TabPanels>
  </Tabs>
   
  
   
  
  
  
  
  </Box>
    )
  }




export default NotificationSecond;
