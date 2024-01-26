import React, { useState,useEffect,Fragment } from "react";
import {
  Container,
  Flex,
  Stack,
  VStack,
  Icon,
  Divider,
  useColorModeValue,
  Avatar,
  Text,
  Button
} from '@chakra-ui/react';
import { BsDot } from 'react-icons/bs';
import axios from 'axios'
import { useSelector } from "react-redux";
 
const baseURL='http://127.0.0.1:8001'
const REACT_APP_CLOUDINARY_CLOUD_NAME = "dvlpq6zex";

const FollowList = (props) => {
    const authentication_user = useSelector((state) => state.authentication_user);
    const [follow, SetFollow] = useState(false);
    const [profileimage2,setProfileImage2] = useState("")

    const getprofileImage = async ()=>{
        try {
            var data = {'username':props.username}
            const res = await axios.post(baseURL + '/api/home/getprofilephoto/',data)
      
            if (res.status === 202) {
              
              setProfileImage2(res.data);
            }
          } catch (error) {
            console.error('Error fetching comments:', error);
          }

    }
useEffect(() => {
    getprofileImage() 
}, []);

const followManagement = async () => {
    var data = {
      following_user: authentication_user.name,
      followed_user: props.username,
    };
    const res = await axios.post(baseURL + "/api/home/follow/", data);
    if (res.status === 200) {
      console.log("followed");
      fetchfollow();
      props.PostsPr();
    }
  };



const fetchfollow = async () => {
    var data = { user: authentication_user.name, author: props.username };
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

 

  return ( 
    <Container maxW="3xl" p={{ base: 5, md: 10 }}>
    <VStack
      boxShadow={useColorModeValue(
        '2px 6px 8px rgba(160, 174, 192, 0.6)',
        '2px 6px 8px rgba(9, 17, 28, 0.9)'
      )}
      bg={useColorModeValue('gray.100', 'gray.800')}
      rounded="md"
      overflow="hidden"
      spacing={0}
    >
        <Fragment>
          <Flex
            w="100%"
            justifyContent="space-between"
            alignItems="center"
            _hover={{ bg: useColorModeValue('gray.200', 'gray.700') }}
          >
            <Stack spacing={0} direction="row" alignItems="center">
              <Flex p={4}>
                <Avatar size="md" src={`https://res.cloudinary.com/${REACT_APP_CLOUDINARY_CLOUD_NAME}/${profileimage2}`} />
              </Flex>
              <Flex direction="column" p={2}>
                <Text
                  color={useColorModeValue('black', 'white')}
                  fontSize={{ base: 'sm', sm: 'md', md: 'lg' }}
                > {props.username} </Text>
                <Text
                  color={useColorModeValue('gray.400', 'gray.200')}
                  fontSize={{ base: 'sm', sm: 'md' }}
                >
                  {props.dateTime}
                </Text>
              </Flex>
            </Stack>
         
              <Flex p={4}>
              <Button
                  backgroundColor={"white"}
                
                  color={follow ? "blue" : "Blue"}
                  onClick={followManagement}
                >
                  {follow ? "following" : "follow"}
                </Button>
              </Flex>

          </Flex>
         
        </Fragment>
    </VStack>
  </Container>



  )
};

export default FollowList;
