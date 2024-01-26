import React from "react";
import Homesidebar from "../Small/Homesidebar";
import { FaUserFriends, FaStar } from "react-icons/fa";
import { MdHome, MdPhotoLibrary, MdSettings } from "react-icons/md";
import { FcHome,FcSettings,FcBusinessman,FcGallery,FcHeadset   } from "react-icons/fc";
import { FaHeadphones } from "react-icons/fa";
import { VStack,Flex } from "@chakra-ui/react";

function FirstSection() {
  return (
<Flex
      mt={'15px'}
      align={{ base: 'stretch', md: 'center' }}

    >
      <VStack  align="stretch">
  
        <Homesidebar title="Home" icon={FcHome} select={true} navigation={'/'} />
        <Homesidebar title="Profile" icon={FcBusinessman } navigation={'/profile'} />
        <Homesidebar title="Photos" icon={FcGallery } navigation={'/photos'}/>
        {/* <Homesidebar title="Premium" icon={FaStar} /> */}
        <Homesidebar title="Settings" icon={FcSettings}  navigation={'/settings'}  />
        <Homesidebar title="Customer support" icon={FcHeadset } />
      </VStack>
    </Flex>
  )
}

export default FirstSection;
