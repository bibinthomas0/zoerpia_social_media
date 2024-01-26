import React, { useEffect, useState } from "react";
import { Stack, HStack,Box,Avatar,AvatarBadge,Spacer,Flex,Text } from '@chakra-ui/react'
import axios from 'axios'


const baseURL='http://127.0.0.1:8001'
const REACT_APP_CLOUDINARY_CLOUD_NAME = "dvlpq6zex";
const UserChatBox = (props) => {
const [profileimage,setProfileimage] = useState("")

    const getprofileImage = async ()=>{
        try {
            var data = {'username':props.username}
            const res = await axios.post(baseURL + '/api/home/getprofilephoto/',data)
      
            if (res.status === 202) {
              
              setProfileimage(res.data);
            }
          } catch (error) {
            console.error('Error fetching comments:', error);
          }

    }

useEffect(() => {
  getprofileImage()

}, [props.username]);




  return (
    <HStack h='70px' bg='pink.100' padding={'2%'}>
    <Avatar src={`https://res.cloudinary.com/${REACT_APP_CLOUDINARY_CLOUD_NAME}/${profileimage}`}>
      <AvatarBadge boxSize='1.25em' bg={props.is_online === true ? 'green.500': 'red.500'} />
    </Avatar>
    <Stack fontWeight={'bold'}
    paddingTop={'5px'}
    align='stretch' paddingLeft={'8px'}>
      <Box  > <Text  fontSize={'20px'} >{props.username}</Text>  </Box>
      <Flex   width={'400px'} >
          <Box > hi there</Box>
          <Spacer />
          <Box>1-22-2023</Box>
         </Flex>
  
    </Stack>
    </HStack>



  )
};

export default UserChatBox;
