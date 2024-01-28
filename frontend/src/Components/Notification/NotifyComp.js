import React, { useState, useEffect } from "react";
import {
  Avatar,
  Flex,
  Text,
  VStack,
  HStack,
  Center,Box,Spacer,Badge,Image,Icon, Tooltip
} from '@chakra-ui/react'
import { SlUserFollow } from "react-icons/sl";
import { RxCross2 } from "react-icons/rx";
import axios from "axios";
import { SlUserUnfollow } from "react-icons/sl";

const REACT_APP_CLOUDINARY_CLOUD_NAME = "dvlpq6zex";
const baseURL = "http://127.0.0.1:8001";


export default function NotifyComp(props) {
  const [postImage,setPostImage] = useState("")
  const [profileimage,setProfileImage]= useState("")
  const [comment,setComment] = useState("")
  const [follow, SetFollow] = useState(false);


  const fetchfollow = async () => {
    var data = { user: props.user, author: props.by_user };
    const res = await axios.post(baseURL + "/api/home/checkfollow/", data);
    if (res.status === 200) {
      SetFollow(true);
    } else {
      SetFollow(false);
    }
  };

  useEffect(() => {
    fetchfollow();
  }, [props]);

  const followManagement = async () => {
    var data = {
      following_user: props.user,
      followed_user: props.by_user,
    };
    const res = await axios.post(baseURL + "/api/home/follow/", data);
    if (res.status === 200) {
      console.log("followed");
      fetchfollow();
   
    }
  };


  // const removefollow = async () => {
  //   var data = {
  //     following_user: props.user,
  //     followed_user: props.by_user,
  //   };
  //   const res = await axios.post(baseURL + "/api/home/follow/", data);
  //   if (res.status === 200) {
  //     console.log("followed");
  //     fetchfollow();
  //     props.GetNotifications()
  //   }
  // };


  const getComment = async ()=>{
    if(props.comment){


    try {
        var data = {comment:props.comment}
        const res = await axios.post(baseURL + '/api/home/getcomment/',data)
  
        if (res.status === 200) { 
          
          setComment(res.data);
        }
      } catch (error) {
        console.error('Error fetching comments:', error);
      }
    }

} 


  const getprofileImage = async () => {
    try {
      var data = { username: props.by_user };
      const res = await axios.post(
        baseURL + "/api/home/getprofilephoto/",
        data
      );

      if (res.status === 202) {
        setProfileImage(res.data)
      }
    } catch (error) {
      console.error("Error fetching comments:", error);
    }
  };





  const getPost = async () => {
    if(props.post_id){


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
  }
  };

useEffect(() => {
  getprofileImage();
}, [props.user]);

  useEffect(() => {
    
    getPost()  
   
      getComment() 
 
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
          <Avatar size='sm' name='Kent Dodds' src={`https://res.cloudinary.com/${REACT_APP_CLOUDINARY_CLOUD_NAME}/${profileimage}`} />
          <Box>
            <Text style={{ paddingTop: '12%' }}>{`${props.by_user} followed you`}</Text>
          </Box>
        </HStack>
        <Spacer />
        <HStack paddingTop={'4%'}>
          {follow ? <Tooltip  label="Unfollow"  ><Icon as={SlUserUnfollow} onClick={followManagement} fontSize={'20px'} /></Tooltip>  : <Icon as={SlUserFollow} onClick={followManagement} fontSize={'25px'} />  }
          
          {/* <Icon as={RxCross2} fontSize={'25px'} /> */}
        </HStack>
        <Spacer />
      </Flex>
    ) : (
      <Flex bg={'rgb(31, 33, 33)'} padding={'3%'} borderRadius={'7px'} margin={'2%'} fontSize={'12px'}>
        <HStack>
          <Avatar size='sm' name='Kent Dodds' src={`https://res.cloudinary.com/${REACT_APP_CLOUDINARY_CLOUD_NAME}/${profileimage}`} />
          <Box>
            <Text style={{ paddingTop: '12%' }}>{`${props.by_user} Commented on your post: '${comment}'`}</Text>
          </Box>
        </HStack>
        <Spacer />
        <Box paddingTop={'4%'}>
          <Spacer />
          {/* <MDBBadge  pill className='me-2 text-dark' color='light' light>mark as read</MDBBadge> */}
        </Box>
        <Image boxSize='50px' objectFit='cover' src={`https://res.cloudinary.com/${REACT_APP_CLOUDINARY_CLOUD_NAME}/${postImage}`} alt='Dan Abramov' />
      </Flex>
    )}
  </div>
  );
}