import React from 'react';
import {
  Avatar,
  Flex,
  Text,
  VStack,
  HStack,
  Center,Box,Spacer,Badge,Image,Icon

} from '@chakra-ui/react'
import { RiUserFollowFill,RiUserUnfollowFill } from "react-icons/ri";
import { MDBBadge } from 'mdb-react-ui-kit';
import { RiUserFollowLine } from "react-icons/ri";
import { SlUserFollow } from "react-icons/sl";
import { RxCross2 } from "react-icons/rx";


export default function ThirdSection() {
  return (

<>
    <Flex bg={'rgb(31, 33, 33)'} padding={'3%'} borderRadius={'7px'} margin={'2%'}>
   <HStack>
     <Avatar  size='sm' name='Kent Dodds' src='https://bit.ly/kent-c-dodds' />
     <Box  >
<Text style={{paddingTop:'12%'}} fontSize={'12px'}>Bibin Liked your post.</Text></Box>
   </HStack >  <Spacer />  
   <Box paddingTop={'4%'}>
   <Spacer />  
   {/* <MDBBadge  pill className='me-2 text-dark' color='light' light>mark as read</MDBBadge> */}
   </Box>
   <Image
    boxSize='50px'
    objectFit='cover'
    src='https://bit.ly/dan-abramov'
    alt='Dan Abramov'
  />
   </Flex>

   <Flex bg={'rgb(31, 33, 33)'} padding={'3%'} borderRadius={'7px'} margin={'2%'} fontSize={'12px'}>
   <HStack>
     <Avatar  size='sm' name='Kent Dodds' src='https://bit.ly/kent-c-dodds' />
     <Box  >
<Text style={{paddingTop:'12%'}} >Albert followed you</Text></Box>
   </HStack >  <Spacer />  
   <HStack paddingTop={'4%'}>
   <Icon as={SlUserFollow} fontSize={'20px'}  />

   <Icon as={RxCross2} fontSize={'25px'}  />
   
   </HStack>

    <Spacer />
   </Flex>
   <Flex bg={'rgb(31, 33, 33)'} padding={'3%'} borderRadius={'7px'} margin={'2%'} fontSize={'12px'}>
   <HStack>
     <Avatar  size='sm' name='Kent Dodds' src='https://bit.ly/kent-c-dodds' />
     <Box  >
<Text style={{paddingTop:'12%'}}  >Bibin Commented on your post: 'Hi bro'</Text></Box>
   </HStack >  <Spacer />  
   <Box paddingTop={'4%'}>
   <Spacer />  
   {/* <MDBBadge  pill className='me-2 text-dark' color='light' light>mark as read</MDBBadge> */}
   </Box>
   <Image
    boxSize='50px'
    objectFit='cover'
    src='https://bit.ly/dan-abramov'
    alt='Dan Abramov'
  />
   </Flex>


   </>
  );
}