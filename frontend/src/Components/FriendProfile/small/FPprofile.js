import React, { useState, useEffect } from "react";
import { Flex, Box, Avatar, Text, Button } from "@chakra-ui/react";
import { Image } from "@chakra-ui/react";
import {

  useDisclosure,
  Input,
} from "@chakra-ui/react";
import { useParams } from 'react-router-dom';
import { useSelector} from 'react-redux';
import axios from 'axios'


const REACT_APP_CLOUDINARY_CLOUD_NAME = "dvlpq6zex";
const REACT_APP_CLOUDINARY_UPLOAD_PRESET = "pafqnehk";
const baseURL='http://127.0.0.1:8001'



const FPprofile = () => {
    const { username } = useParams();

  const [coverImageUrl, setCoverImageUrl] = useState("");
  const [profileImageUrl, setProfileImageUrl] = useState("");




const GetProfileImage = async ()=>{
    console.log('hh');
    try {
        var data = {'username':username}
        const res = await axios.post(baseURL + '/api/home/getprofilephoto/',data)
  
        if (res.status === 202) {
          
          setProfileImageUrl(res.data);
        }
      } catch (error) {
        console.error('Error fetching comments:', error);
      }

}
const GetCoverImage = async ()=>{
 
    try {
        var data = {'username':username}
        const res = await axios.post(baseURL + '/api/home/getcoverphoto/',data)
        console.log('kkkkk')
        if (res.status === 202) {
            console.log('rrrrrrrrrrr') 
          setCoverImageUrl(res.data);
        }
      } catch (error) {
        console.error('Error fetching comments:', error);
      }

} 
  useEffect(() => {
    GetCoverImage() 
  GetProfileImage()

  }, []);
  

  return (
    <Box>
     
      <Flex
        padding={"20px"}
        position="relative"
        align="center"
        justify="center"
        width={"100%"}
        height={"70%"}
        overflow="hidden"
        marginTop={'0'}
      >
        <Box
          width={"100%"}
          h={{xl:"300px",base:"240px"}}
          overflow="hidden"
          
          cursor={"pointer"}
        >
          <Image
            src={
                coverImageUrl
                  ? `https://res.cloudinary.com/${REACT_APP_CLOUDINARY_CLOUD_NAME}/${coverImageUrl}`
                  : "https://content.cdntwrk.com/files/aHViPTYxNjA4JmNtZD1pdGVtZWRpdG9yaW1hZ2UmZmlsZW5hbWU9aXRlbWVkaXRvcmltYWdlXzVkMTNiMTFlYjIyOTkucG5nJnZlcnNpb249MDAwMCZzaWc9NDE1NDJmM2VjYzdhMTY4NjQyZmNhNTExMjdlMTRmMzQ%253D"
              }
            alt="Dan Abramov"
            width={"100%"}
            objectFit="cover"
            height={"80%"}
          />
        </Box>

        <Avatar
          height={{xl:"250px",base:"200px"}}
          w={{xl:"250px",base:"200px"}}
          src={
            profileImageUrl
              ? `https://res.cloudinary.com/${REACT_APP_CLOUDINARY_CLOUD_NAME}/${profileImageUrl}`
              : "https://bit.ly/dan-abramov"
          }
          alt="Dan Abramov"
          position="absolute"
          top="70%"
          left="50%"
          transform="translate(-50%, -50%)"
          cursor={"pointer"}
        />
      </Flex>
    </Box>
  );
};

export default FPprofile;
