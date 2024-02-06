import React,{useState,useEffect} from "react";
import { GoDotFill } from "react-icons/go";
import { Box, Center, Container,Flex,Avatar,Text,Spacer } from "@chakra-ui/react";
import axios from "axios";

const baseURL = "http://127.0.0.1:8001";
const OnlineUser = (props) => {
    const isUserOnline = props.onlineUsers.some(userObj => userObj.username === props.user);
    const REACT_APP_CLOUDINARY_CLOUD_NAME = "dvlpq6zex";
    const [profileimage, setProfileImage] = useState("");

    
    const getprofileImage = async () => {
        try {
          var data = { username: props.user };
          const res = await axios.post(
            baseURL + "/api/home/getprofilephoto/",
            data
          );
    
          if (res.status === 202) {
            setProfileImage(res.data);
          
          }
        } catch (error) {
          console.error("Error fetching comments:", error);
        }
      };
      useEffect(() => {
        getprofileImage(); 
      }, []);






  return (
    <Flex style={{Height:"20px",backgroundColor:"rgb(31, 33, 33)",padding:"3%",borderRadius:"15px",margin:'5%'}}>
    <Box>  <Avatar size='lg'  src={`https://res.cloudinary.com/${REACT_APP_CLOUDINARY_CLOUD_NAME}/${profileimage}`} />  </Box>
<Center style={{padding:"4%"}}><Text fontSize={'20px'} >{props.user}</Text></Center>
<Spacer/>
<Box paddingTop={'6%'}><GoDotFill style={{ color: isUserOnline ? "green" : "red" }} />
</Box>

    </Flex>



  )
};

export default OnlineUser;
