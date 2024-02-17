import React from "react";
import ProfileImage from "../Small/ProfileImage";
import { Box } from "@chakra-ui/react";
import ProfileDetails from "../Small/ProfileDetails";
import ProfileBody from "../Small/ProfileBody";


const SecondSectionProfile = () => {
  return (
    <Box  marginBottom={'4'}  overflow="auto"  sx={{
        '&::-webkit-scrollbar': {
          width: '5px', 
        },
        '&::-webkit-scrollbar-thumb': {
          backgroundColor: 'transparent',
        },
      }} Height="825px">
    <ProfileImage/>
    <ProfileDetails/>
    <ProfileBody/>
    </Box>
  );
};

export default SecondSectionProfile;
