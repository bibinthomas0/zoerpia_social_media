import React, { useState, useEffect } from "react";
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
import axios from "axios";


const REACT_APP_CLOUDINARY_CLOUD_NAME = "dvlpq6zex";
const baseURL = "http://127.0.0.1:8001";


export default function NotifyComp(props) {
  const [postImage,setPostImage] = useState("")
  const [profileimage,setProfileImage]= useState("")

  const getprofileImage = async () => {
    try {
      var data = { username: props.user };
      const res = await axios.post(
        baseURL + "/api/home/getprofilephoto/",
        data
      );

      if (res.status === 202) {
        setProfileImage(res.data);
        console.log(res.data);
      }
    } catch (error) {
      console.error("Error fetching comments:", error);
    }
  };

  const getPost = async () => {
    try {
      var data = { 'post': props.post_id };
      const res = await axios.post(
        baseURL + "/api/home/getpost/",
        data
      );

      if (res.status === 200) {
        setPostImage(res.data.image);
        
      }
    } catch (error) {
      console.error("Error fetching comments:", error);
    }
  };
  useEffect(() => {
    getprofileImage();
    getPost()  
  }, [props]);



  return (

    <div>
    {props.notification_type === 'like' ? (
      <Flex bg={'rgb(31, 33, 33)'} padding={'3%'} borderRadius={'7px'} margin={'2%'}>
        <HStack>
          <Avatar size='sm' name='Kent Dodds' src={`https://res.cloudinary.com/${REACT_APP_CLOUDINARY_CLOUD_NAME}/${profileimage}`} />
          <Box>
            <Text style={{ paddingTop: '12%' }} fontSize={'12px'}>
              {`${props.by_user} Liked your post`}.
            </Text>
          </Box>
        </HStack>
        <Spacer />
        <Box paddingTop={'4%'}>
          <Spacer />
          {/* <MDBBadge  pill className='me-2 text-dark' color='light' light>mark as read</MDBBadge> */}
        </Box>
        <Image overflow={'hidden'} boxSize='50px' objectFit='cover' src={`https://res.cloudinary.com/${REACT_APP_CLOUDINARY_CLOUD_NAME}/${postImage}`} alt='Dan Abramov' />
      </Flex>
    ) : props.notification_type === 'follow' ? (
      <Flex bg={'rgb(31, 33, 33)'} padding={'3%'} borderRadius={'7px'} margin={'2%'} fontSize={'12px'}>
        <HStack>
          <Avatar size='sm' name='Kent Dodds' src='https://bit.ly/kent-c-dodds' />
          <Box>
            <Text style={{ paddingTop: '12%' }}>Albert followed you</Text>
          </Box>
        </HStack>
        <Spacer />
        <HStack paddingTop={'4%'}>
          <Icon as={SlUserFollow} fontSize={'20px'} />
          <Icon as={RxCross2} fontSize={'25px'} />
        </HStack>
        <Spacer />
      </Flex>
    ) : (
      <Flex bg={'rgb(31, 33, 33)'} padding={'3%'} borderRadius={'7px'} margin={'2%'} fontSize={'12px'}>
        <HStack>
          <Avatar size='sm' name='Kent Dodds' src='https://bit.ly/kent-c-dodds' />
          <Box>
            <Text style={{ paddingTop: '12%' }}>Bibin Commented on your post: 'Hi bro'</Text>
          </Box>
        </HStack>
        <Spacer />
        <Box paddingTop={'4%'}>
          <Spacer />
          {/* <MDBBadge  pill className='me-2 text-dark' color='light' light>mark as read</MDBBadge> */}
        </Box>
        <Image boxSize='50px' objectFit='cover' src='https://bit.ly/dan-abramov' alt='Dan Abramov' />
      </Flex>
    )}
  </div>
  );
}