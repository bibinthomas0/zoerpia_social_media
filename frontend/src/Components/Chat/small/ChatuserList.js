import React,{useContext,useState,useEffect} from "react";
import { ChatSelectContext } from "../../../Context/ChatSelectContext";
import axios from "axios";

const baseURL = "http://127.0.0.1:8002";
const ChatuserList = (props) => {
    const { selectedChat, setSelectedChat } = useContext(ChatSelectContext);
    const [lastmessage,setLastMessage] = useState()
    const handlechat = () =>{
        setSelectedChat(props.name)
        console.log('llllllllllllllllllll',props.name)
    }

  const GetLastMessages = async () => {
    console.log(props.key,"key")
    try {
      var data = { roomid: props.room };
      const res = await axios.get(baseURL + "/api/chat/lastmessage/", {
        params: data,
      });

      if (res.status == 202) {
        setLastMessage(res.data);
      } else {
        console.error("Error fetching messages:");
      }
    } catch (error) {
      console.error("Error fetching messages:", error);
    }
  };

useEffect(() => {
   
GetLastMessages()
 
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
                    src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava1-bg.webp"
                    alt="avatar"
                    className="d-flex align-self-center me-3"
                    width="60"
                  />
                  <span className="badge bg-success badge-dot"></span>
                </div>
                <div className="pt-1"> 
                  <p className="fW-bold mb-0">{props.name}</p>
                  <p className="small " style={{color:"white"}}> 
                    {lastmessage}
                  </p>
                </div>
              </div> 
              <div className="pt-1">
                <p className="small mb-1" style={{color:"white"}}>Just now</p>
                <span className="badge bg-danger rounded-pill float-end">
                  3
                </span>
              </div>
            </a>
          </li>



  )
};

export default ChatuserList;
