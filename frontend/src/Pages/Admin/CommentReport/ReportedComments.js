import React,{useState,useEffect} from "react";
import axios from 'axios'
import { Fragment } from "react";
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
    Box,
    useDisclosure,
    Collapse,
    Button,
  } from "@chakra-ui/react";
  import { Heading } from "@chakra-ui/react";



const REACT_APP_CLOUDINARY_CLOUD_NAME = "dvlpq6zex";
const baseURL = "http://127.0.0.1:8001";
const ReportedComments = (props) => {
    const { isOpen, onToggle } = useDisclosure()
    const [profileimage,setProfileImage3] = useState("")
    const [comment,setComment] = useState("")

    const getprofileImage = async ()=>{
        try {
            var data = {'username':props.reported_by}
            const res = await axios.post(baseURL + '/api/home/getprofilephoto/',data)
      
            if (res.status === 202) {
              
              setProfileImage3(res.data);
            }
          } catch (error) {
            console.error('Error fetching comments:', error);
          }
    
    } 
    
    useEffect(() => {
    getprofileImage()
    getComment()
    
    }, []);
 
    const getComment = async ()=>{
        try {
            var data = {'comment':props.id}
            const res = await axios.post(baseURL + '/api/home/getcomment/',data)
      
            if (res.status === 200) {
              
              setComment(res.data);
            }
          } catch (error) {
            console.error('Error fetching comments:', error);
          }
    
    } 

const HandleCommentVerify = async () =>{
    console.log(props._id)
    try {
        var data = {'r_comment':props._id}
        const res = await axios.post(baseURL + '/api/home/commentverify/',data)
  
        if (res.status === 202) {
            props.fetchData()
          console.log('sucesssss')
        }
      } catch (error) {
        console.error('Error fetching comments:', error);
      }

    }

    const HandleCommentRemove = async () =>{
        console.log(props._id)

        try {
            var data = {'orginalcomment':props.id,'r_comment':props._id}
            const res = await axios.post(baseURL + '/api/home/commentremove/',data)
      
            if (res.status === 202) {
                props.fetchData()
              console.log('sucesssss')
            }
          } catch (error) {
            console.error('Error fetching comments:', error);
          }
    
        }

  return (
    <Fragment>
    <Flex
      w="100%"
      justifyContent="space-between"
      alignItems="center"
      _hover={{ bg: "gray.200" }}
      onClick={onToggle}
      margin={"3px"}
      cursor={"pointer"}
      color={'black'}
    >
      <Stack spacing={0} direction="row" alignItems="center">
        <Flex p={4}>
          <Avatar
            size="md"
            name={props.commenter}
            src={`https://res.cloudinary.com/${REACT_APP_CLOUDINARY_CLOUD_NAME}/${profileimage}`} 
          />
          
        </Flex> 
        <Flex direction="column" p={2}>
          <Text
         
            fontSize={{ base: "sm", sm: "md", md: "lg", lg: "xl" }}
            
          > {`${props.reported_by} Reports the comment of ${props.commenter}`}</Text>
          <Text color={"gray.400"} fontSize={{ base: "sm", sm: "md" }}>
            {props.dateTime}
          </Text>
        </Flex>
      </Stack>
      <Flex p={4}>{props.verified ? "Verified":"View details"}</Flex>
    </Flex>

    <Collapse  in={isOpen} animateOpacity>
      <Flex>
        <Stack marginBottom={"10px"}>
          <Text fontSize="xl" mb={4}>
        
            {`Comment: ${comment}`}
          </Text>
          <Text>Written By: {props.commenter} </Text>
          <Text>Reported By:{props.reported_by} </Text>

          {(props.verified === false) && (
  <>
    <Button size="sm" colorScheme="green" mt="24px" onClick={HandleCommentVerify}>
      Not offensive
    </Button>
    <Button size="sm" colorScheme="red" onClick={HandleCommentRemove}>
      Remove Comment
    </Button>
  </>
)}


        </Stack>
      </Flex>
    </Collapse>
  </Fragment>




  )
};

export default ReportedComments;
