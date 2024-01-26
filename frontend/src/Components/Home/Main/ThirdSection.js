import React, { useContext, useState, useEffect } from "react";
import NotifyComp from "../../Notification/NotifyComp";
import axios from 'axios';
import {useSelector} from "react-redux";
import { Box } from "@chakra-ui/react";


const baseURL = "http://127.0.0.1:8001";
const ThirdSection = () => {

  const authentication_user = useSelector((state) => state.authentication_user);
  const [notes, setNotes] = useState([]);




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
    
     
}, []);



return (
  <Box   marginBottom={'4'}  overflow="auto"  sx={{
    '&::-webkit-scrollbar': {
      width: '5px', 
    },
    '&::-webkit-scrollbar-thumb': {
      backgroundColor: 'transparent',
    },
  }} maxHeight="825px"
  padding={'1%'}   >
    {/* {!notes ? (
      <p>Loading...</p>
    ) : ( */}
     { notes.map((data) => (
        <NotifyComp
          key={data._id} 
          user={data.user}
          notification_type={data.notification_type}
          post_id={data.post_id} 
          by_user={data.by_user}
        />
      ))}
    {/* )} */}
  </Box>
);

};

export default ThirdSection;
