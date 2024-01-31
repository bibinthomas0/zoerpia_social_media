import React,{useState,useEffect} from "react";
import Homesidebar from "../../Home/Small/Homesidebar";
import { FaUserFriends, FaStar } from "react-icons/fa";
import { MdHome, MdPhotoLibrary, MdSettings } from "react-icons/md";
import { FaHeadphones } from "react-icons/fa";
import { VStack,Flex } from "@chakra-ui/react";
import { FcHome,FcSettings,FcBusinessman,FcGallery,FcHeadset   } from "react-icons/fc";
import { useNotification } from "../../../Context/WebSocketService";
import { MdOutlineChat } from "react-icons/md";

const FirstSectionProfile = () => {

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
  
        <Homesidebar title="Home" icon={FcHome} navigation={'/'} />
        <Homesidebar title="Profile" icon={FcBusinessman }  select={true} navigation={'/profile'} />
        <Homesidebar title={`Messages (${count})`} icon={MdOutlineChat }  navigation={'/chatlist'} />
        <Homesidebar title="Photos" icon={FcGallery } />
     
        <Homesidebar title="Settings" icon={FcSettings}  navigation={'/settings'} />
        {/* <Homesidebar title="Customer support" icon={FcHeadset } /> */}
      </VStack>
    </Flex>
  )
};

export default FirstSectionProfile;
