import { Stack,Flex,Center,Text,Box,Square } from "@chakra-ui/react";
import React from "react";
import FirstSectionProfile from "../../../Components/profile/Main/FirstSectionProfile";
import SecondSectionProfile from "../../../Components/profile/Main/SecondSectionProfile";

const ProfilePage = () => {
  return <div>

<Flex fontWeight={"bold"}
      bg={'black'}
      color={'white'} >
  <Box w={'20%'} paddingLeft={'27px'} fontWeight={'bold'}  >
    <FirstSectionProfile/>
  </Box>
  <Box width={'65%'}>
    <SecondSectionProfile/>
  </Box>
  <Box flex='1' >
    <Text>Box 3</Text>
  </Box>
</Flex>



  </div>;
};

export default ProfilePage;
