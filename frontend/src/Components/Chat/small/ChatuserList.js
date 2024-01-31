import React,{useContext,useState,useEffect} from "react";
import { ChatSelectContext } from "../../../Context/ChatSelectContext";
import axios from "axios";
import { useSelector } from "react-redux";
import { useNotification } from "../../../Context/WebSocketService";


const REACT_APP_CLOUDINARY_CLOUD_NAME = "dvlpq6zex";
const baseURL = "http://127.0.0.1:8002";
const ChatuserList = (props) => {
  const authentication_user = useSelector((state) => state.authentication_user);
  const { socket,unread_msg,Notification,SocketManagement } = useNotification();
    const { selectedChat, setSelectedChat } = useContext(ChatSelectContext);
    const [lastmessage,setLastMessage] = useState([])
    const [room, setRoom] = useState("");
    const [senderimage, setSenderImage] = useState("");
    const [count,setCount] = useState("")


    const getRecieverImage = async () => {
      let baseURLL = "http://127.0.0.1:8001";
      try {
        var data = { username: props.name };
        const res = await axios.post(
          baseURLL + "/api/home/getprofilephoto/",
          data
        );
  
        if (res.status === 202) {
          setSenderImage(res.data);
          console.log("eeeeeeeee", res.data);
        }
      } catch (error) {
        console.error("Error fetching comments:", error);
      }
    };
    const handlechat = () =>{
        setSelectedChat(props.name)
        console.log('llllllllllllllllllll',props.name)
        setLastMessage("")
        setCount("")
    }
    useEffect(() => {
      messageCount()
    }, [lastmessage]);
    

const messageCount = () =>{
  let totalLength = 0;
    
  for (const key in unread_msg) {
    if (Array.isArray(unread_msg[key]) && key === room) {
      totalLength += unread_msg[key].length;
    }
  } 
  setCount(totalLength)
  console.log("Total length of unread messages in the specific room:", totalLength);
}


    
    const GetRoom = async () => {
      try {
        var data = { user1: authentication_user.name, user2: props.name };
        const res = await axios.get(baseURL + "/api/chat/findroom/", {
          params: data,
        });
  
        if (res.status === 200) {
          setRoom(res.data.name);
          console.log('sssssssss',res.data.name);
        }
      } catch (error) {
        console.error("Error fetching comments:", error);
      }
    };

    useEffect(() => {
  GetRoom()
    }, [unread_msg,socket]);
    
  const GetLastMessages = () => {


    for (const key in unread_msg) {
      if (Array.isArray(unread_msg[key]) && key === room) {
        const msgs = unread_msg[key]
        setLastMessage(msgs[msgs.length - 1])
      }
    } 

    
  //   try {
  //     var data = { 'roomid': room };
      
  //     const res = await axios.get(baseURL + "/api/chat/lastmessage/", data);

  //     if (res.status == 202) {
  //       setLastMessage(res.data);
  //       console.log("jkhdshdshhfdlhfdlh",res.data);
  //     } else {
  //       console.error("Error fetching messages:");
  //     }
  //   } catch (error) {
  //     console.error("Error fetching messages:", error);
  //   }
  };


useEffect(() => {
    
GetLastMessages()
          
}, [unread_msg]);

useEffect(() => {
  getRecieverImage()
}, []);


  return (
<li className="p-2 m-2 mt-3 border-bottom" onClick={handlechat} style={selectedChat === props.name ? {backgroundColor: 'grey.100',color:"white",fontWeight:"bold" ,borderRadius:"15px"} : {borderRadius:"15px",backgroundColor:"rgb(33, 35, 35)"}}>
    
            <a
              href="#!" 
              className="d-flex justify-content-between"
            >
              <div className="d-flex flex-row">
                <div>
                  <img
                    src={senderimage ? `https://res.cloudinary.com/${REACT_APP_CLOUDINARY_CLOUD_NAME}/${senderimage}`:"https://bit.ly/ryan-florence " }
                    alt="avatar"
                    className="d-flex align-self-center me-3"
                    width="60"
                    
                  />
                  <span className="badge bg-success badge-dot"></span>
                </div>
                <div className="pt-1"> 
                  <p className="fW-bold mb-0">{props.name}</p>
                  {lastmessage && 
                  <p className="small " style={{color:"white"}}> 
                    {lastmessage.content}
                  </p> }
                </div>
              </div> 
              {count !==0 && 
              <div className="pt-1">
                <p className="small mb-1" style={{color:"white"}}>Just now</p>
                <span className="badge bg-danger rounded-pill float-end">
                  {count}
                </span>
              </div> }
            </a>
          </li>



  )
};

export default ChatuserList;
