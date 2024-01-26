import React, { useState, useEffect } from "react";
import {
  Flex,
  Avatar,
  Box,
  Text,
  IconButton,
  Stack,
  Input,
  Button,
} from "@chakra-ui/react";
import axios from "axios";
import { useToast } from "@chakra-ui/react";
import { BsThreeDotsVertical } from "react-icons/bs";
import { useSelector } from "react-redux";
import { Menu, MenuButton, MenuList, MenuItem, Badge } from "@chakra-ui/react";
import { MDBCollapse, MDBBtn, MDBBadge } from "mdb-react-ui-kit";
import { formatDistance } from "date-fns";
import { Link } from "react-router-dom";


const REACT_APP_CLOUDINARY_CLOUD_NAME = "dvlpq6zex";
const baseURL = "http://127.0.0.1:8001";
const Replycomment = (props) => {
  const authentication_user = useSelector((state) => state.authentication_user);
  const toast = useToast();
  const [loading, setLoading] = useState(false);
  const [reply, setReply] = useState("");

  const [profileimage, setProfileImage] = useState("");
  const [time, setTime] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [isOpen1, setIsOpen1] = useState(false);
  const toggleOpen1 = () => setIsOpen1(!isOpen1);

  const HandleCommentsubmit = async () => {
    toggleOpen1();
    try {
      var data = {
        username: authentication_user.name,
        comment_id: props.comment,
        reply: reply,
        replied_to: props.username,
      };
      const res = await axios.post(baseURL + "/api/home/createreply/", data);

      if (res.status === 200) {
        props.Getreplies();
      }
    } catch (error) {
      console.error("Error fetching comments:", error);
    }
  };
  const getTime = () => {
    try {
      let indian_date = new Date().toLocaleString("en-Us", {
        timeZone: "Asia/Kolkata",
      });

      var result = formatDistance(
        new Date(props.created_at),
        new Date(indian_date),
        {
          includeSeconds: true,
        }
      );
      setTime(result);
    } catch {
      console.log("ggg");
    }
  };
  const getprofileImage = async () => {
    try {
      var data = { username: props.username };
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
  useEffect(() => {
    getTime();
    getprofileImage()
  }, [props]);

  return (
    <>
      <Flex width={"400px"} marginBottom={"5px"}>
        <Box padding={"1%"} borderRadius={"20px"} marginBottom={"2px"}>
          <Stack direction="row">
            <Avatar size="xs" src={`https://res.cloudinary.com/${REACT_APP_CLOUDINARY_CLOUD_NAME}/${profileimage}`} />
            <Link
              to={
                authentication_user.name !== props.username
                  ? `user/${props.username}`
                  : "profile"
              }
            >
            <Text fontWeight={"bold"}>{props.username}</Text></Link>
          </Stack>

          <Flex alignItems="center" marginLeft="3%" width="100%">
            <Link
              to={
                authentication_user.name !== props.replied_to
                  ? `user/${props.replied_to}`
                  : "profile"
              }
            >
              <Text fontWeight="bold">@{props.replied_to}</Text>
            </Link>

            <Text marginLeft="2" fontSize="md">
              {props.content}
            </Text>
          </Flex>
          <Text fontSize={"10px"} color={"grey"} width={"100%"}>
            {time} ago
          </Text>
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
        </Box>
        <Box>
          <MDBBadge
            onClick={toggleOpen1}
            pill
            color="dark"
            light
            style={{ cursor: "pointer" }}
          >
            Reply
          </MDBBadge>
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
                  props.HandleCommentReport(props._id, props.username)
                }
              >
                Report
              </MenuItem>
              {authentication_user.name === props.username && (
                <MenuItem
                  bg={"black"}
                  as="a"
                  cursor={"pointer"}
                  onClick={() => props.HandleDeleteComment(props._id)}
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

export default Replycomment;
