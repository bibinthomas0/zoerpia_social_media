import React from "react";
import Homesidebar from "../../Home/Small/Homesidebar";
import { FaUserFriends, FaStar } from "react-icons/fa";
import { MdHome, MdPhotoLibrary, MdSettings } from "react-icons/md";
import { FaHeadphones } from "react-icons/fa";
import { VStack,Flex } from "@chakra-ui/react";
import { FcHome,FcSettings,FcBusinessman,FcGallery,FcHeadset   } from "react-icons/fc";

const FirstSectionProfile = () => {
  return (
<Flex
      mt={'15px'}
      align={{ base: 'stretch', md: 'center' }}

    >
      <VStack  align="stretch">
  
        <Homesidebar title="Home" icon={FcHome} navigation={'/'} />
        <Homesidebar title="Profile" icon={FcBusinessman }  select={true} navigation={'/profile'} />
        <Homesidebar title="Photos" icon={FcGallery } />
        {/* <Homesidebar title="Premium" icon={FaStar} /> */}
        <Homesidebar title="Settings" icon={FcSettings}  navigation={'/settings'} />
        <Homesidebar title="Customer support" icon={FcHeadset } />
      </VStack>
    </Flex>
  )
};

export default FirstSectionProfile;
