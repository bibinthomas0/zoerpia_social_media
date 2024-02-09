import React, { useContext, useState, useEffect } from "react";
import NotifyComp from "../../Notification/NotifyComp";
import axios from "axios";
import { useSelector } from "react-redux";
import { Center, Container } from "@chakra-ui/react";
import { useNotification } from "../../../Context/WebSocketService";
import OnlineUser from "../Small/OnlineUser";

const baseURL = "http://127.0.0.1:8001";
const ThirdSection = () => {
  const authentication_user = useSelector((state) => state.authentication_user);
  const [notes, setNotes] = useState([]);
  const [following, setFollowing] = useState([]);
  const [onlineUsers, setOnlineUsers] = useState([]);

  const FollowingUsers = async () => {
    console.log('k');
    try {
      var data = { user: authentication_user.name };
      const res = await axios.post(baseURL + "/api/home/followingList/", data);
      if (res.status === 202) {
        setFollowing(res.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    FollowingUsers();
  }, [onlineUsers]);

  useEffect(() => {
    const fetchOnlineUsers = async () => {
      try {
        let baseuRL = "http://127.0.0.1:8002";
        const response = await axios.get(baseuRL + "/api/chat/online-users/");
        setOnlineUsers(response.data);

        console.log(Object.values(response.data));
      } catch (error) {
        console.error("Error fetching online users:", error);
      }
    };

    fetchOnlineUsers();
  }, []);

  return (
    <Container
      marginBottom={"4"}
      overflow="auto"
      sx={{
        "&::-webkit-scrollbar": {
          width: "5px",
        },
        "&::-webkit-scrollbar-thumb": {
          backgroundColor: "transparent",
        },
      }}
      Height="820px"
      padding={"1%"}
    >
      {notes.length === 0 ? (
        <Container
          overflow="auto"
          sx={{
            "&::-webkit-scrollbar": {
              width: "5px",
            },
            "&::-webkit-scrollbar-thumb": {
              backgroundColor: "transparent",
            },
          }}
        >
          {following.map((user) => (
            <OnlineUser user={user} onlineUsers={onlineUsers} />
          ))}
        </Container>
      ) : (
        <Center paddingTop={"50%"}>No users is online...</Center>
      )}
    </Container>
  );
};

export default ThirdSection;
