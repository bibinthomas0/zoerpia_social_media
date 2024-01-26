import React from "react";
import { Stack,Flex,Center,Text,Box,Square } from "@chakra-ui/react";
import FirstSection from "../../../Components/Home/Main/FirstSection";
// import FPprofile from "../../../Components/FriendProfile/small/FPprofile";
import FpSecond from "../../../Components/FriendProfile/FPsecond";

const Friendprofile = () => {
  return (

<Flex color='white'  bg={'black'}>
  <Box w={'20%'} paddingLeft={'27px'} fontWeight={'bold'} >
    <FirstSection/>
  </Box>
  <Box width={'65%'}>
    <FpSecond/>
  </Box>
  <Box flex='1' >
    <Text>Box 3</Text>
  </Box>
</Flex>




  )
};

export default Friendprofile;
