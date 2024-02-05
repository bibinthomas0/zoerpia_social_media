import React,{useEffect,useState} from "react";
import Homesidebar from "../Small/Homesidebar";
import { FaUserFriends, FaStar } from "react-icons/fa";
import { MdHome, MdPhotoLibrary, MdSettings } from "react-icons/md";
import { FcHome,FcSettings,FcBusinessman,FcGallery,FcHeadset   } from "react-icons/fc";
import { FaHeadphones } from "react-icons/fa";
import { VStack,Flex } from "@chakra-ui/react";
import { useNotification } from "../../../Context/WebSocketService";
import { MdOutlineChat } from "react-icons/md";
import { FcAlarmClock } from "react-icons/fc";
import axios from "axios";
import {useSelector} from "react-redux";



const baseURL = "http://127.0.0.1:8001";
function FirstSection() {
  const authentication_user = useSelector((state) => state.authentication_user);
  const { socket,unread_msg,Notification } = useNotification();
  const [count,setCount] = useState("")
  const [unread_Not,setUnread_Not] = useState([])
useEffect(() => {
var len = unread_msg.length
let totalLength = 0;


for (const key in unread_msg) {
  if (Array.isArray(unread_msg[key])) {
    totalLength += unread_msg[key].length;
  }
}
setCount(totalLength)
console.log("Total length of all arrays:", totalLength);
}, [unread_msg]);

useEffect(() => {
  GetUnreadnotifications()   
}, [socket]);
 

  
const GetUnreadnotifications = async ()=>{
      try {
          const userId = authentication_user.name; 
  const res = await axios.get(baseURL + '/api/home/notifyunreadlist/', {
    params: { user_id: userId },
  });
    
          if (res.status === 200) {
            const parsedData = JSON.parse(res.data)
            console.log(parsedData)
            setUnread_Not(parsedData);  
          } 
        } catch (error) {
          console.error('Error fetching comments:', error);
        }
  
  }


  return (
<Flex
      mt={'15px'}
      align={{ base: 'stretch', md: 'center' }}
    >
      <VStack  align="stretch">
  
        <Homesidebar title="Home" icon={FcHome} select={true} navigation={'/'} />
        <Homesidebar title="Profile" icon={FcBusinessman } navigation={'/profile'} />
        <Homesidebar title={`Messages (${count})`} icon={MdOutlineChat }  navigation={'chatlist'} />
        <Homesidebar title={`Notifications (${unread_Not.length})`} icon={FcAlarmClock } navigation={'/notification'}/>
        {/* <Homesidebar title="Premium" icon={FaStar} /> */}
        <Homesidebar title="Settings" icon={FcSettings}  navigation={'/settings'}  />
      </VStack>
    </Flex>
  )
}

export default FirstSection;
