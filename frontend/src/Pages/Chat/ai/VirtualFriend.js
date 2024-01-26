import React,{useState,useEffect,useRef} from "react";
import {
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBCard,
  MDBCardHeader,
  MDBCardBody,
  MDBCardFooter,
  MDBIcon,
  MDBBtn,
} from "mdb-react-ui-kit";
import { Container } from "@chakra-ui/react";
import AiMessage from "../../../Components/Chat/AiBot/AiMessage";
import axios from "axios";
import { useSelector } from "react-redux";

const REACT_APP_CLOUDINARY_CLOUD_NAME = "dvlpq6zex";

export default function VirtualFriend() {
    const authentication_user = useSelector((state) => state.authentication_user);
    const baseURL = "http://127.0.0.1:8002";
    const [isTyping, setIsTyping] = useState(false);
    const scrollRef = useRef();
    const [senderimage, setSenderImage] = useState("");

    const [message,setMessage] = useState("")
    const [messages, setMessages] = useState([
        {
        role: "system",
        content:
        "hi",
        },
        ]);



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
            getSenderImage();
         
          }, []);
        useEffect(() => {
            const element = scrollRef.current;
            if (element) {
              element.scrollTop = element.scrollHeight;
            }
          }, [messages]);
 const chatData = async (userMessage) => {
    setIsTyping(true);
    try {
        var data = { "prompt": userMessage };
        console.log(data)
        const res = await axios.get( 
          baseURL + "/api/chat/bardresponse/", 
          { params: data } 
        );
    
        if (res.status === 200) {
            setIsTyping(false);
          console.log(res.data);
          setMessages((prevMessages) => [
            ...prevMessages,
            {
              role: "assistant",
              content: res.data,
            },
          ]);
       
        }
      } catch (error) {
        setIsTyping(false);
        console.error("Error fetching comments:", error);
      }
           
          };


          useEffect(()=>{
            console.log(messages)
          },[messages])


const handleMessage = (e)=>{
    e.preventDefault();
    const input = message;
    if (input.trim() !== "") {
      handleSendMessage(input);
      setMessage("");
    }
}
const handleSendMessage = (messageContent) =>{
    setMessages((prevMessages) => [
        ...prevMessages,
        { role: "user", content: messageContent },
      ]);
      
      setIsTyping(true);    
      chatData(messageContent)

}



  return (
    <div ref={scrollRef}  style={{ width:"500px",padding:"1px",borderRadius: "15px",backgroundColor:"#18191A" }} >
      <MDBRow className="d-flex " >
        <MDBCol md="10" lg="8" xl="6" >
        <MDBCard   ref={scrollRef} id="chat2" style={{   maxHeight: "500px",width:"500px",backgroundColor:"rgb(33, 35, 35)",color:"white",borderColor:"red",borderRadius: "15px",boxShadow:"inherit" }}>
            <MDBCardHeader className="d-flex justify-content-between align-items-center p-3">
              <h5 className="mb-0">Virtual Friend </h5>
              <MDBBtn color="red" size="sm" rippleColor="dark">
                Let's Chat
              </MDBBtn>
            </MDBCardHeader>
                <container ref={scrollRef} id="chat2" style={{ overflowY: "auto", maxHeight: "500px",width:"500px",}}    >
              <MDBCardBody  >  
              {messages.map((mes, index) => (
  mes.role === 'user' ? (
        <div className="d-flex flex-row justify-content-end">
          <div>
            <p className="small p-2 me-3 mb-1 text-white rounded-3 bg-primary">
            {mes.content} 
            </p>
            {/* <p className="small me-3 mb-3 rounded-3 text-muted d-flex justify-content-end">
              00:15
            </p> */}
          </div>
          <img
            src={`https://res.cloudinary.com/${REACT_APP_CLOUDINARY_CLOUD_NAME}/${senderimage}`}
            alt="avatar 1"
            style={{ width: "45px", height: "45px", borderRadius: "50%" }}
          />
        </div>
      ) : (
        <div className="d-flex flex-row justify-content-start mb-4">
          <img
            src="https://shorturl.at/pqzJZ"
            alt="avatar 1"
            style={{ width: "45px", height: "45px", borderRadius: "50%" }}
          />
          <div>
            <p
              className="small p-2 ms-3 mb-1 rounded-3"
              style={{ backgroundColor: "gray" }}
            >
              {mes.content} 
            </p>
            {/* <p className="small ms-3 mb-3 rounded-3 text-muted">
              00:13
            </p> */}
          </div>
        </div>
      )
      


      ))}
      {isTyping && <p>Bot is typing...</p>}
                {/* <AiMessage/> */}
           
              </MDBCardBody>
              </container>
            <MDBCardFooter className="text-muted d-flex justify-content-start align-items-center p-3">
              <img
                src={`https://res.cloudinary.com/${REACT_APP_CLOUDINARY_CLOUD_NAME}/${senderimage}`}
                alt="avatar 3"
                style={{ width: "45px", height: "45px", borderRadius: "50%",marginRight:"2%" }}
              />
              <input
                type="text"
                class="form-control form-control-lg"
                
                placeholder="Type message"
                onChange={((event)=>setMessage(event.target.value))}
                value={message} 
                
              />
              {/* <a className="ms-1 text-muted" href="#!">
                <MDBIcon fas icon="paperclip" />
              </a>
              <a className="ms-3 text-muted" href="#!">
                <MDBIcon fas icon="smile" />
              </a> */}
              <a className="ms-3" onClick={handleMessage} style={{cursor:"pointer"}} >
                <MDBIcon fas icon="paper-plane"/>
                
              </a>
            </MDBCardFooter>
          </MDBCard>
        </MDBCol>
      </MDBRow>
    </div>
  );
}