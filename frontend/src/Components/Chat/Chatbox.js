import React, { useState, useEffect, useContext, useRef } from "react";
import {
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBCard,
  MDBCardBody,
  MDBIcon,
  MDBFile,
} from "mdb-react-ui-kit";
import { Box, Text } from "@chakra-ui/react";
import { useSelector } from "react-redux";
import axios from "axios";
import { ChatSelectContext } from "../../Context/ChatSelectContext";
import webSocketService from "../../Context/WebSocketService";
import Message from "./small/Message";
import PulseCards from "../Home/Main/SkeltonHome";
import ReconnectingWebSocket from "reconnecting-websocket";
import { useNotification } from "../../Context/WebSocketService";
import { Spinner } from '@chakra-ui/react'



const baseURL = "http://127.0.0.1:8002";
const REACT_APP_CLOUDINARY_CLOUD_NAME = "dvlpq6zex";
const REACT_APP_CLOUDINARY_UPLOAD_PRESET = "pafqnehk";

export default function ChatPage() {
  const authentication_user = useSelector((state) => state.authentication_user);
  const { selectedChat, setSelectedChat } = useContext(ChatSelectContext);
  const [socket, setSocket] = useState(null);
  const [userId, setUserId] = useState("");
  const [room, setRoom] = useState("");
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState(null);
  const [activeUsers, setActiveUsers] = useState([]);
  const scrollRef = useRef();
  const [senderimage, setSenderImage] = useState("");
  const [recieverimage, setRecieverImage] = useState("");
  const fileInputRef = useRef(null);
  const [selectedImage, setSelectedImage] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [loading, setloading] = useState(false);
  const { SocketManagement } = useNotification();

  var ws_scheme = window.location.protocol === "https:" ? "wss" : "ws";

  const ws_port = '';
  let url =   ws_scheme+'://'+ 'localhost:8002' +`/ws/notify/${authentication_user.name}/`

  useEffect(() => {
    uploadImage();
  }, [selectedImage]);

  const uploadImage = async () => {

    setloading(true);
    const data = new FormData();
    data.append("file", selectedImage);
    data.append("upload_preset", REACT_APP_CLOUDINARY_UPLOAD_PRESET);
    data.append("cloud_name", REACT_APP_CLOUDINARY_CLOUD_NAME);
    data.append("folder", "Zorpia-posts");

    try {
      const response = await fetch(
        `https://api.cloudinary.com/v1_1/${REACT_APP_CLOUDINARY_CLOUD_NAME}/image/upload`,
        {
          method: "POST",
          body: data,
        }
      );
      const res = await response.json();

      if (socket) {
        const data = {
          message: res.public_id,
          username: authentication_user.name,
          m_type: "image",
        };
        socket.send(JSON.stringify(data));
        setMessage("");
      }
      setloading(false);
    } catch (error) {
      setloading(false);
      console.log(error);
    }
  };

  const handleIconClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleFileChange = (e) => {
    setSelectedImage(e.target.files[0]);

    console.log("gggggg");
  };
  const getUserId = async () => {
    try {
      var data = { username: authentication_user.name };
      const res = await axios.get(baseURL + "/api/chat/getuser/", {
        params: data,
      });

      if (res.status === 202) {
        setUserId(res.data.id);
      }
    } catch (error) {
      console.error("Error fetching comments:", error);
    }
  };

  const seenMessage = async () => {
    try {
      var data = { username: authentication_user.name };
      const res = await axios.get(baseURL + "/api/chat/getuser/", {
        params: data,
      });

      if (res.status === 202) {
        setUserId(res.data.id);
      }
    } catch (error) {
      console.error("Error fetching comments:", error);
    }
  };



  useEffect(() => {
    console.log(selectedChat);
    GetRoom();
  }, [selectedChat]);

  const GetRoom = async () => {
    try {
      var data = { user1: authentication_user.name, user2: selectedChat };
      const res = await axios.get(baseURL + "/api/chat/findroom/", {
        params: data,
      });

      if (res.status === 200) {
        setRoom(res.data.name);
        console.log(res.data.name);
      }
    } catch (error) {
      console.error("Error fetching comments:", error);
    }
  };

  const SocketManagementt = () => {
    if (authentication_user.name && room) {
      if (socket) {
        socket.close();
        console.log("Previous WebSocket disconnected");
      }
      const newSocket = new ReconnectingWebSocket(
        ws_scheme+`://localhost:8002/ws/chat/${room}/${authentication_user.name}/`
      );
      setSocket(newSocket);
      newSocket.onopen = () =>{ 
        console.log("WebSocket connected");}
      newSocket.onclose = () => {
        console.log("WebSocket disconnected");
      };
      return () => {
        newSocket.close();
      };
    }
  };

  useEffect(() => {
    SocketManagement()
    
    getSocketMessage();
  }, [socket]);

  const getSocketMessage = () => {
    if (socket) {
      socket.onmessage = (event) => {
        const data = JSON.parse(event.data);
        if (data.user_list) {
          setActiveUsers(data.user_list);
        } else {
          console.log(data);
          setMessages((prevMessages) => [...prevMessages, data]);
          const element = scrollRef.current;
          if (element) {
            element.scrollTop = element.scrollHeight;
          }
        }
      };
    }
  };
  const getRecieverImage = async () => {
    let baseURLL = "http://127.0.0.1:8001";
    try {
      var data = { username: selectedChat };
      const res = await axios.post(
        baseURLL + "/api/home/getprofilephoto/",
        data
      );

      if (res.status === 202) {
        setRecieverImage(res.data);
        console.log("eeeeeeeee", res.data);
      }
    } catch (error) {
      console.error("Error fetching comments:", error);
    }
  };

  const getSenderImage = async () => {
    let baseURLL = "http://127.0.0.1:8001";
    try {
      var data = { username: authentication_user.name };
      const res = await axios.post(
        baseURLL + "/api/home/getprofilephoto/",
        data
      );

      if (res.status === 202) {
        setSenderImage(res.data);
      }
    } catch (error) {
      console.error("Error fetching comments:", error);
    }
  };
  useEffect(() => {
    SocketManagementt();
  }, [room]);

  useEffect(() => {
    getSenderImage();
    getRecieverImage();
    getUserId();
  }, [room]);

  const handleSubmit = (event) => {
    event.preventDefault();
    if (message && socket) {
      const data = {
        message: message,
        username: authentication_user.name,
        m_type: "chat",
      };
      socket.send(JSON.stringify(data));
      setMessage("");
    }
  };


  const GetMessages = async () => {
    try {
      var data = { room: room };
      const res = await axios.get(baseURL + "/api/chat/messages/", {
        params: data,
      });

      if (res.status == 202) {
        setMessages(res.data);
      } else {
        console.error("Error fetching messages:", res.status, res.statusText);
      }
    } catch (error) {
      console.error("Error fetching messages:", error);
    }
  };

  useEffect(() => {
    GetMessages();
  }, [room]);

  useEffect(() => {
    const element = scrollRef.current;
    if (element) {
      element.scrollTop = element.scrollHeight;
    }
  }, [messages, message]);

  return (
    <MDBContainer fluid>
      <MDBRow>
        <MDBCol md="12">
          <MDBCard
            id="chat3"
            style={{
              borderRadius: "15px",
              marginTop: "60px",
              backgroundColor: "black",
            }}
          >
            <MDBCardBody>
              <text>{selectedChat}</text>
              <MDBRow style={{ height: "700px" }}>
                <div
                  className="container"
                  ref={scrollRef}
                  style={{
                    overflow: "auto",
                    maxHeight: "700px",
                    padding: "1%",
                    position: "absolute",
                    bottom: "3%",
                  }}
                >
                  {/* {!messages && <PulseCards />}
                  {messages && messages.length === 0 && <h1>empty</h1>} */}
                  {Array.isArray(messages)
                    ? messages.map((element) => {
                        return (
                          <Message
                            content={
                              element.content
                                ? element.content
                                : element.message
                            }
                            userId={userId}
                            uname={element.username}
                            time={element.timestamp}
                            seen={element.seen}
                            user={element.user}
                            room={element.room}
                            m_type={element.m_type}
                            senderimage={senderimage}
                            recieverimage={recieverimage}
                          />
                        );
                      })
                    : ""}
                </div>
{selectedChat ?
            (    <div
                  className="text-muted d-flex justify-content-start align-items-center pe-3 pt-3 mt-2"
                  style={{ bottom: 0, position: "absolute",backgroundColor:"black", marginBottom:"10px" }}
                >
                  <img
                    src={`https://res.cloudinary.com/${REACT_APP_CLOUDINARY_CLOUD_NAME}/${senderimage}`}
                    alt="avatar 3"
                    style={{ height: "50px",borderRadius:"50%",marginRight:"5px" }}
                  />
                  <input
                    type="text"
                    className="form-control form-control-lg"
                    id="exampleFormControlInput2"
                    placeholder="Type message"
                    value={message}
                    style={{width:"80%"}}
                    onChange={(event) => setMessage(event.target.value)}
                  />

                  {loading ? (
                    <Spinner color='red.500' />
                  ) : (
                    <div>
                      <label
                        htmlFor="formFileMultiple"
                        className="ms-1 text-muted"
                        onClick={handleIconClick}
                      >
                        <MDBIcon fas icon="paperclip" />
                      </label>
                      <MDBFile
                        id="formFileMultiple"
                        ref={fileInputRef}
                        multiple
                        onChange={handleFileChange}
                        style={{ display: "none" }}
                      />
                    </div>
                  )}

                  <a className="ms-3 text-muted" href="#!">
                    <MDBIcon fas icon="smile" />
                  </a>
                  <a className="ms-3" href="#!">
                    <MDBIcon fas icon="paper-plane" onClick={handleSubmit} />
                  </a>
                </div> )  :(<Text color={'white'}>Select any chat to countinue....</Text>)       }
              </MDBRow>
            </MDBCardBody>
          </MDBCard>
        </MDBCol>
      </MDBRow>
    </MDBContainer>
  );
}
