import React, { useState, useEffect } from "react";
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Flex,
  Avatar,
  Box,
  Heading,
  Text,
  IconButton,
  Image,
  Button,
  Input,
  Stack,
  Center,
} from "@chakra-ui/react";
import { BiLike, BiChat, BiShare } from "react-icons/bi";
import { BsThreeDotsVertical } from "react-icons/bs";
import { useSelector } from "react-redux";
import axios from "axios";
import { Collapse } from "@chakra-ui/react";
import { Menu, MenuButton, MenuList, MenuItem } from "@chakra-ui/react";
import { useToast } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { formatDistance } from "date-fns";
import { MDBBtn, MDBModal, MDBModalDialog, MDBModalContent, MDBModalBody } from 'mdb-react-ui-kit';
import CommentComp from "./CommentComp";

const baseURL = "http://127.0.0.1:8001";
const PostView = (props) => {
  const toast = useToast();
  const [loading, setLoading] = useState(false);
  const [isOpen, setisOpen] = useState(false);
  const [comment, setComment] = useState("");
  const [comments, setComments] = useState([]);
  const [liked, setLiked] = useState(false);
  const [follow, SetFollow] = useState(false);

  const REACT_APP_CLOUDINARY_CLOUD_NAME = "dvlpq6zex";
  const authentication_user = useSelector((state) => state.authentication_user);
  const [time, setTime] = useState("");
  const [profileimage, setProfileImage] = useState("");
  const [deletes, setdelete] = useState("");
  const [bottomModal, setBottomModal] = useState(false);
  const [selectedId,setDeleteId] = useState("")
  const toggleOpen = () => setBottomModal(!bottomModal);

  const DeleteComment = async () => {
    toggleOpen();
    console.log(selectedId);
    
    try {
      var data = { commentid: selectedId };
      const res = await axios.delete(baseURL + "/api/home/commentdelete/", {
        params: data,  
      });
  
      if (res.status === 204) { 
        console.log('Comment deleted successfully');
        fetchData()
      } else {
        console.log('Failed to delete comment');
      }
    } catch (error) {
      console.error("Error deleting comment:", error);
    }
  
    setDeleteId("");
  };
  

  const DeletePost = async () => {
    toggleOpen()
    try {
      var data = { postid: props._id };
      const res = await axios.delete(baseURL + "/api/home/postdelete/", {
        params: data,
      });

      if (res.status === 204) { 
        console.log('Post deleted successfully');
        props.postlist()
      } else {
        console.log('Failed to delete POst');
      }
    } catch (error) {
      console.error("Error fetching comments:", error);
    }
    setDeleteId("")

  };

  const HandleDeletePost = (data) => {
      setdelete("Post");
      toggleOpen()
      console.log("delte");
  
  };

  const HandleDeleteComment = (data) => {
    setDeleteId(data)

      setdelete("Comment");
      toggleOpen()
      console.log("delte",data);
  };



  const getTime = () => {
    try {
      let indian_date = new Date().toLocaleString("en-Us", {
        timeZone: "Asia/Kolkata",
      });
    

      var result = formatDistance(new Date(props.time), new Date(indian_date), {
        includeSeconds: true,
      });
      setTime(result);
    } catch {
      console.log("ggg");
    }
  };
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
    getTime();
  }, []);

  const LikePost = async () => {
    let data = { post: props._id, user: authentication_user.name };
    const res = await axios.post(baseURL + "/api/home/likepost/", data);
    props.postlist();
    if (res.status === 202) {
      setLiked(true);
    }
  };
  const HandleCommentsubmit = async () => {
    console.log(comment);
    if (comment.length > 0) {
      let commendata = {
        comment: comment,
        user_name: authentication_user.name,
        post_id: props._id,
      };
      setLoading(true);
      const res = await axios.post(
        baseURL + "/api/home/createcomment/",
        commendata
      );
      if (res.status === 200) {
        setLoading(false);
        setComment("");
        fetchData()
      }
    }
  };
  const fetchData = async () => {
    try {
      const res = await axios.get(baseURL + "/api/home/listcomment/", {
        params: { id: props._id },
      });

      if (res.status === 200) {
        setComments(res.data);
      }
    } catch (error) {
      console.error("Error fetching comments:", error);
    }
  };


  const fetchfollow = async () => {
    var data = { user: authentication_user.name, author: props.user };
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
      following_user: authentication_user.name,
      followed_user: props.user,
    };
    const res = await axios.post(baseURL + "/api/home/follow/", data);
    if (res.status === 200) {
      console.log("followed");
      fetchfollow();
      props.postlist();
    }
  };

  const PostToast = () => {
    toast({
      title: "Reported succesfully.",
      status: "success",
      duration: 4000,
      position: "top",
      isClosable: true,
      colorScheme: "green",
    });
  };

  const HandleCommentReport = async (id, userName) => {
    console.log(id, userName);
    try {
      const res = await axios.post(baseURL + "/api/home/commentreport/", {
        id: id,
        Commenter: userName,
        post_id: props._id,
        reported_by: authentication_user.name,
      });

      if (res.status === 200) {
        PostToast();
       
      }
    } catch (error) {
      console.error("Error", error);
    }
  };

  const HandlePosttReport = async () => {
    try {
      const res = await axios.post(baseURL + "/api/home/postreport/", {
        post_id: props._id,
        reported_by: authentication_user.name,
      });

      if (res.status === 200) {
        PostToast();
        console.log("success");
      }
    } catch (error) {
      console.error("Error", error);
    }
  };

const openComment = ()=>{
  setisOpen(!isOpen);
  fetchData()

}



  return (
    <Card
      maxW="100%"
      marginTop="10px"
      backgroundColor={isOpen === true ? "rgb(33, 35, 35)" : "#18191A"}
      mt="10px"
      borderRadius={"10px"}
      fontWeight={"bold"}
      boxShadow="lg"
      color={"white"}
    >
      <CardHeader>
        <Flex spacing="4">
          <Flex flex="1" gap="4" alignItems="center" flexWrap="wrap">
            <Avatar
              name="Segun Adebayo"
              src={`https://res.cloudinary.com/${REACT_APP_CLOUDINARY_CLOUD_NAME}/${profileimage}`}
            />

            <Stack direction={"row"} align="center" ml={"5px"}>
              <Link
                to={
                  authentication_user.name !== props.user
                    ? `user/${props.user}`
                    : "profile"
                }
              >
                <Text fontSize={"24px"} fontWeight={"bold"}>
                  {props.user}
                </Text>
              </Link>
              {authentication_user.name !== props.user && (
                <Button
                  padding={"2px"}
                  backgroundColor={"#18191A"}
                  size="xl"
                  color={follow ? "blue" : "Blue"}
                  onClick={followManagement}
                  _hover={{ bg: "rgb(31, 33, 33)" }}
                >
                  {follow ? "following" : "follow"}
                </Button>
              )}
            </Stack>
          </Flex>
          <Text fontWeight={"normal"} fontSize={"13px"}>
            {time} ago
          </Text>
          <Menu>
            <MenuButton>
              <IconButton
                variant="ghost"
                colorScheme="white"
                aria-label="See menu"
                icon={<BsThreeDotsVertical />}
              />
            </MenuButton>
            
            <MenuList backgroundColor={"black"}>
            {authentication_user.name !== props.user && (
              <MenuItem
                as="a"
                onClick={HandlePosttReport}
                backgroundColor={"black"}
                cursor={"pointer"}
              >
                Report
              </MenuItem>   )}
              {authentication_user.name === props.user && (
                <MenuItem
                  as="a"
                  onClick={HandleDeletePost}
                  backgroundColor={"black"}
                  cursor={"pointer"}
                >
                  Delete
                </MenuItem>
              )}
            </MenuList>
          </Menu>
        </Flex>
      </CardHeader>
      <CardBody>
        <Text fontSize={"14px"} fontWeight={"light"}>
          {props.content}
        </Text>
      </CardBody>
      <Center h={"50%"}>
        {props.image && (
          <Image
            style={{ maxWidth: "60%" }}
            src={`https://res.cloudinary.com/${REACT_APP_CLOUDINARY_CLOUD_NAME}/${props.image}`}
            alt="Chakra UI"
          />
        )}
      </Center>
      <CardFooter
        justify="space-between"
        flexWrap="wrap"
        sx={{
          "& > button": {
            minW: "136px",
          },
        }}
      >
        <Button
          flex="1"
          _hover={{ bg: "rgb(31, 33, 33)" }}
          variant="ghost"
          leftIcon={<BiLike />}
          onClick={LikePost}
          color={"white"}
        >
          {props.likes.length} Like
        </Button>
        <Button
          flex="1"
          variant="ghost"
          _hover={{ bg: "rgb(31, 33, 33)" }}
          leftIcon={<BiChat />}
          color={"white"}
          onClick={openComment}
        >
          Comments
        </Button>

        <Button
          flex="1"
          variant="ghost"
          leftIcon={<BiShare />}
          color={"white"}
          _hover={{ bg: "rgb(31, 33, 33)" }}
        >
          Share
        </Button>
      </CardFooter>
      <Box display={"flex"} justifyContent={"center"}>
        <Input
          variant="unstyled"
          placeholder="Add comment..."
          width={"40%"}
          mb={"1%"}
          value={comment}
          onChange={(event) => setComment(event.target.value)}
          color={"white"}
        />
        <Button
          color={"white"}
          isLoading={loading}
          loadingText="Submitting"
          colorScheme="black"
          size="xs"
          variant="outline"
          onClick={HandleCommentsubmit}
        >
          Comment
        </Button>
      </Box>
      {comments && (
        <Collapse in={isOpen} animateOpacity>
          <Box p="40px" mt="4" rounded="md" shadow="md">
            {comments.map((comm) => {
              return (
               <CommentComp _id={comm._id} fetchData={fetchData} comm={comm} HandleCommentReport={HandleCommentReport} HandleDeleteComment={HandleDeleteComment}  />
              );
            })}
          </Box>
        </Collapse>
      )}

<MDBModal animationDirection='top' open={bottomModal} tabIndex='-1' setOpen={setBottomModal}>
        <MDBModalDialog position='bottom' frame>
          <MDBModalContent>
            <MDBModalBody className='py-1'  style={{backgroundColor:"white",borderRadius:"15px",color:"black"}}>
              <div className='d-flex justify-content-center align-items-center my-3'>
                <p className='mb-0' >{`Are you sure to remove this ${deletes}`}</p>
                <MDBBtn color='danger' size='sm' className='ms-2' onClick={()=>selectedId ? DeleteComment() : DeletePost() }>
                  Remove
                </MDBBtn>
            
              </div>
            </MDBModalBody>
          </MDBModalContent>
        </MDBModalDialog>
      </MDBModal>
    </Card>
  );
};

export default PostView;
