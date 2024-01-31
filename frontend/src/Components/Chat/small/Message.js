import React from "react";
import axios from "axios";
import{ useState, useEffect,useContext } from "react";
import { useSelector } from "react-redux";
import { formatDistance } from 'date-fns'
import { MDBRipple } from 'mdb-react-ui-kit';
import { useNotification } from "../../../Context/WebSocketService";

const REACT_APP_CLOUDINARY_CLOUD_NAME = "dvlpq6zex";
const baseURL = "http://127.0.0.1:8002";


const Message = (props) => {
    const authentication_user = useSelector((state) => state.authentication_user);
    
    const [time,setTime] = useState("")
   
useEffect(() => {
getTime()
console.log(props.recieverimage)
}, [props.user]);
 


const getTime = () =>{

    let currentdate = new Date();
    let indian_date = new Date().toLocaleString("en-Us", {timeZone: 'Asia/Kolkata'});
    let m_date = props.time.toLocaleString("en-Us", {timeZone: 'Asia/Kolkata'})
 
    var result = formatDistance(
        new Date(props.time), 
        new Date(indian_date),
        { includeSeconds: true }
      )
    
      setTime(result)
}
  return (

    <>
    {props.user !== props.userId && authentication_user.name!==props.uname ?
    <div className="d-flex flex-row justify-content-start" style={{width:"90%"}}>
    <img
      src={`https://res.cloudinary.com/${REACT_APP_CLOUDINARY_CLOUD_NAME}/${props.recieverimage}`}
      alt="avatar 1"
      style={{ width: "45px", height: "100%" }}
    />
    <div>
      <p
        className="small p-2 ms-3 mb-1 rounded-3"
        style={{ backgroundColor: "#f5f6f7" }}
      >
        
        {props.m_type === 'image'? <MDBRipple rippleTag='a'>
      <img
        src={`https://res.cloudinary.com/${REACT_APP_CLOUDINARY_CLOUD_NAME}/${props.content}`}
        className='img-fluid rounded'
        alt='example'
        style={{overflow:"hidden",maxHeight:"200px"}}
       
      />
    </MDBRipple>:props.content}
      </p>
      <p className="small ms-3 mb-3 rounded-3 text-muted float-end">
        {time}
      </p>
    </div>
  </div>
:
  <div className="d-flex flex-row justify-content-end pr-3" >
    <div>
      {props.m_type === 'image'? 
      
      <div className="small p-2 me-3 mb-1 text-white rounded-3 bg-primary ">
      
      
      <MDBRipple rippleTag='a'>
      <img
        src={`https://res.cloudinary.com/${REACT_APP_CLOUDINARY_CLOUD_NAME}/${props.content}`}
        className='img-fluid rounded'
        alt='example'

    style={{overflow:"hidden",maxHeight:"200px"}}
      />
    </MDBRipple>        </div>:  
    
    <p className="small p-2 me-3 mb-1 text-white rounded-3 bg-primary">
   { props.content}   </p>                 }
   
      <p className="small me-3 mb-3 rounded-3 text-muted">
      {time}
      </p>
    </div>
    <img
      src={`https://res.cloudinary.com/${REACT_APP_CLOUDINARY_CLOUD_NAME}/${props.senderimage}`}
      alt="avatar 1"
      style={{ width: "45px", height: "100%" }}
    />
  </div> }            
  
    </>
  )
};

export default Message;
