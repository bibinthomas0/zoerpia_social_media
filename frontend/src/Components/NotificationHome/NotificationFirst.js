import React,{useEffect,useState} from "react";
import Homesidebar from "../Home/Small/Homesidebar";
import { FaUserFriends, FaStar } from "react-icons/fa";
import { MdHome, MdPhotoLibrary, MdSettings } from "react-icons/md";
import { FcHome,FcSettings,FcBusinessman,FcGallery,FcHeadset   } from "react-icons/fc";
import { FaHeadphones } from "react-icons/fa";
import { VStack,Flex } from "@chakra-ui/react";
import { useNotification } from "../../Context/WebSocketService";
import { MdOutlineChat } from "react-icons/md";
import { FcAlarmClock } from "react-icons/fc";

function NotificationFirst() {
  const { socket,unread_msg,Notification } = useNotification();
  const [count,setCount] = useState("")

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




  return (
<Flex
      mt={'15px'}
      align={{ base: 'stretch', md: 'center' }}

    >
      <VStack  align="stretch">
  
        <Homesidebar title="Home" icon={FcHome}  navigation={'/'} />
        <Homesidebar title="Profile" icon={FcBusinessman } navigation={'/profile'} />
        <Homesidebar title={`Messages (${count})`} icon={MdOutlineChat }  navigation={'chatlist'} />
        <Homesidebar title="Notifications" icon={FcAlarmClock } select={true} navigation={'/notification'}/>
        {/* <Homesidebar title="Premium" icon={FaStar} /> */}
        <Homesidebar title="Settings" icon={FcSettings}  navigation={'/settings'}  />
      </VStack>
    </Flex>
  )
}

export default NotificationFirst;