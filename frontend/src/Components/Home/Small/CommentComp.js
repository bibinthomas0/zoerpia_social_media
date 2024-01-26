import React, { useState, useEffect } from "react";
import { Flex, Avatar, Box, Text, IconButton, Stack,Input,Button } from "@chakra-ui/react";
import axios from "axios";
import { useToast } from "@chakra-ui/react";
import { BsThreeDotsVertical } from "react-icons/bs";
import { useSelector } from "react-redux";
import { Menu, MenuButton, MenuList, MenuItem, Badge } from "@chakra-ui/react";
import { MDBCollapse, MDBBtn, MDBBadge } from "mdb-react-ui-kit";
import Replycomment from "./Replycomment";
import { formatDistance } from "date-fns";
import { Link } from "react-router-dom";

const REACT_APP_CLOUDINARY_CLOUD_NAME = "dvlpq6zex";
const baseURL = "http://127.0.0.1:8001";
const CommentComp = (props) => {
  const authentication_user = useSelector((state) => state.authentication_user);
  const toast = useToast();
  const [loading, setLoading] = useState(false);
  const [reply,setReply] = useState("")
  const [time, setTime] = useState("");
  const [profileimage, setProfileImage] = useState("");

  const [isOpen, setIsOpen] = useState(false);
  const [isOpen1, setIsOpen1] = useState(false);


  const toggleOpen = () => {
    setIsOpen(!isOpen);
}



  const toggleOpen1 = () => setIsOpen1(!isOpen1);
const[replies,setReplies] = useState([])

useEffect(() => {
if(isOpen){
    Getreplies() 
}

}, [isOpen]);

const getTime = () => {
    try {
      let indian_date = new Date().toLocaleString("en-Us", {
        timeZone: "Asia/Kolkata",
      });
  

      var result = formatDistance(new Date(props.comm.created_at), new Date(indian_date), {
        includeSeconds: true,
      });
      setTime(result);
    } catch {
      console.log("ggg");
    }
  };


useEffect(() => {
    getTime()
    getprofileImage()
}, []); 



  const Getreplies = async () => {
    try {
      var data = { id: props._id};
      const res = await axios.get(baseURL + "/api/home/replylist/", {
        params: data,
      });

      if (res.status === 200) {
        setReplies(res.data);
       console.log('hhhhhhhhhhh',res.data);

      }
    } catch (error) {
      console.error("Error fetching comments:", error);
    }
  };



const HandleCommentsubmit =  async () =>{
    try {
        var data = { 'username': authentication_user.name, 'comment_id':props.comm._id ,'reply':reply,'replied_to':props.comm.user_name };
        const res = await axios.post(
          baseURL + "/api/home/createreply/",
          data
        );
  
        if (res.status === 200) {
          console.log(res.status);
          Getreplies()
toggleOpen1()
setReply('')
        }
      } catch (error) {
        console.error("Error fetching comments:", error);
      }
}

  const getprofileImage = async () => {
    try {
      var data = { username: props.comm.user_name };
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

  return (
    <>
      <Flex borderRadius={"10px"} width={"100%"} style={{ backgroundColor: isOpen ? "#18191A" : undefined }}
>
        <Box padding={"1%"} borderRadius={"20px"} maxWidth={'800px'}  marginBottom={"2px"}>
          <Stack direction="row">
            <Avatar size="xs" src={`https://res.cloudinary.com/${REACT_APP_CLOUDINARY_CLOUD_NAME}/${profileimage}`}  />
            <Link
              to={
                authentication_user.name !== props.comm.user_name
                  ? `user/${props.comm.user_name}`
                  : "profile"
              }
            >
            
            <Text fontWeight={"bold"}>{props.comm.user_name}</Text>
            </Link>
          </Stack>
          <Text marginLeft={"3%"} width={"100%"}>
            {props.comm.comment}
            <Text fontSize={'10px'} color={"grey"}>{time} ago</Text>
            <MDBCollapse open={isOpen1}> 
            <Box display={"flex"} justifyContent={"center"}>
        <Input
          variant="unstyled"
          placeholder="Add reply...."
          width={"60%"}
          mb={"1%"}
          value={reply}
          onChange={(event) => setReply(event.target.value)}
          color={"white"}
        />
        <Button
          color={"white"}
        //   isLoading={loading}
          loadingText="Submitting"
          colorScheme="black"
          size="xs"
          variant="outline"
          onClick={HandleCommentsubmit}
        >
          reply
        </Button>
      </Box>
      
      
         </MDBCollapse>

            <MDBBadge  onClick={toggleOpen} pill color='dark' light style={{cursor:"pointer"}} >{isOpen ? 'Hide Replies':'View Replies'}</MDBBadge>
          </Text>
          <MDBCollapse open={isOpen}> 
          <div>

  {replies.map((msg) => (
    <Replycomment
      _id={msg._id}
      content={msg.reply}
      created_at={msg.created_at}
      HandleCommentReport={props.HandleCommentReport}
      HandleDeleteComment={props.HandleDeleteComment}
      username={msg.username}
      Getreplies={Getreplies}
      replied_to={msg.replied_to}
      comment={props.comm._id}
    />
  ))}
</div>


              </MDBCollapse>      

        </Box>
        <Box>
        <MDBBadge  onClick={toggleOpen1} pill color='dark' light style={{cursor:"pointer"}}>Reply</MDBBadge>
          <Menu>
            <MenuButton>
              <IconButton
                variant="ghost"
                colorScheme="white"
                aria-label="See menu"
                icon={<BsThreeDotsVertical />}
              />
            </MenuButton>
            <MenuList bg={"black"}>
              <MenuItem
                bg={"black"}
                as="a"
                cursor={"pointer"}
                onClick={() =>
                  props.HandleCommentReport(
                    props.comm._id,
                    props.comm.user_name
                  )
                }
              >
                Report
              </MenuItem>
              {authentication_user.name === props.comm.user_name && (
                <MenuItem
                  bg={"black"}
                  as="a"
                  cursor={"pointer"}
                  onClick={() => props.HandleDeleteComment(props.comm._id)}
                >
                  Remove
                </MenuItem>
              )}
            </MenuList>
          </Menu>
        </Box>
      </Flex>
    </>
  );
};

export default CommentComp;
