import React, { Fragment, useState, useEffect } from "react";
import {
  Container,
  Text,
  Stack,
  Avatar,
  Divider,
  Icon,Button,Box
} from "@chakra-ui/react";
import { ImQuotesLeft } from "react-icons/im";
import axios from "axios";




const REACT_APP_CLOUDINARY_CLOUD_NAME = "dvlpq6zex";
const baseURL = "http://127.0.0.1:8001";


const ReportedPost = (props) => {
  const [postImage, setPostImage] = useState("");
    const [thePost,setThePost] = useState([])


  const getPost = async () => {
    try {
      var data = { post: props.post };
      const res = await axios.post(baseURL + "/api/home/getpost/", data);
console.log('ff');
      if (res.status === 200) {
        setThePost(res.data);
        console.log(res.data)
        setPostImage(res.data.image)
      }
    } catch (error) {
      console.error("Error fetching comments:", error);
    }
  };

    const HandlePostVerify = async () =>{
        try {
            var data = {'r_post':props.id}
            const res = await axios.post(baseURL + '/api/home/postverify/',data)
      
            if (res.status === 202) {
                props.fetchData()
              console.log('sucesssss')
            }
          } catch (error) {
            console.error('Error fetching comments:', error);
          }
    
        }
const HandlePostRemove = async () =>{
            try {
                var data = {'orginalpost':props.post,'r_post':props.id}
                const res = await axios.post(baseURL + '/api/home/postremove/',data)
          
                if (res.status === 202) {
                    props.fetchData()
                  console.log('sucesssss')
                }
              } catch (error) {
                console.error('Error fetching comments:', error);
              }
        
            }


 
  useEffect(() => {
    getPost()
  
  }, []);
  





  return (
    <Fragment>
     <Stack
      direction={{ base: 'column', sm: 'row' }}
      spacing={10}
      pt={3}
      pb={3}
      marginTop={'4%'}
      boxShadow="lg" 
      borderTop="2px solid"
      borderBottomLeftRadius="lg"
        borderBottomRightRadius="lg"
    >
        <Avatar 
          size="2xl"
          showBorder={true}
          borderColor="green.400"
          name="avatar"
          src={`https://res.cloudinary.com/${REACT_APP_CLOUDINARY_CLOUD_NAME}/${postImage}`}
          d={{ base: "none", sm: "block" }}
        />

        <Stack direction="column" spacing={4} textAlign="left" maxW="4xl">
          <Icon as={ImQuotesLeft} w={8} h={8} color="gray.400" />
          <Text fontSize="md" fontWeight="medium">
            {thePost.content}
          </Text>
          <Stack alignItems={{ base: "center", sm: "flex-start" }} spacing={0}>
            <Text fontWeight="bold" fontSize="lg">
              {`Author: ${thePost.user}`} 
            </Text>
            <Text fontWeight="medium" fontSize="sm" color="gray.600">
            {`Reported by: ${props.reported_by}`} 
            </Text>
          </Stack>
          {(props.verified === false) ? (
          <Box>
            <Button
                 h={10}
                 px={6}
                 color="white"
                 variant="solid"
                 fontSize="md"
                 rounded="md"
                 mb={{ base: 2, sm: 0 }}
                 zIndex={5}
                 lineHeight={1}
                 mr={5}
                 bg="blue.400"
                 _hover={{ bg: 'blue.600' }}
            onClick={HandlePostVerify}
            >No action</Button>
               <Button
                 h={10}
                 px={6}
                 color="white"
                 variant="solid"
                 fontSize="md"
                 rounded="md"
                 mb={{ base: 2, sm: 0 }}
                 zIndex={5}
                 lineHeight={1}
                 bg="blue.400"
                 _hover={{ bg: 'blue.600' }}
                 onClick={HandlePostRemove}
            
            >Take action and remove</Button>


          </Box>):(<Text fontWeight={'bold'}>Action taken</Text>)}
        </Stack>
      </Stack>
    </Fragment>
  );
};

export default ReportedPost;
