import React,{useState,useEffect} from "react";
import {
    MDBInputGroup,
    MDBBtn
  } from 'mdb-react-ui-kit';
import axios from "axios";
import { useSelector,useDispatch } from "react-redux";
import { set_Authentication } from "../../../Redux/Authentication/AuthenticationSlice";
import { useNavigate } from "react-router-dom";


  const baseURL = "http://127.0.0.1:8000";
const ChangeUsername = () => {
    const authentication_user = useSelector((state) => state.authentication_user);
    const [userDetails,setUserDetails] = useState()
    const [newName, setNewName] = useState('');
 

    const [valid,setValid] = useState(true)

      useEffect(() => {
        const FetchUserdetails = async () =>{
            try {
              var data = {'username':authentication_user.name}
              const res = await axios.get("http://127.0.0.1:8000" + '/api/accounts/userdetail/',{ params: data } )
        
              if (res.status === 200) {
                console.log(res.data.name);
                setUserDetails(res.data);
                setNewName(res.data.name)
              }
            } catch (error) {
              console.error('Error fetching comments:', error);
            }
        
        
          }
    FetchUserdetails()
        
      }, []);

      const UpdateName = async  () =>{
      
        try {
          var data = { 'username':authentication_user.name,'newname':newName };
          const res = await axios.put(baseURL + "/api/accounts/updatename/", 
            data,  
          );
      
          if (res.status === 202) { 
    
            console.log('name updated successfully');
    
          } else {
            console.log('Failed to update username');
          }
        } catch (error) {
          console.error("Error deleting comment:", error);
        }

    }




  return (
    <>
    <MDBInputGroup className='mb-3'>
    <input className='form-control'value={newName} type='text' onChange={(event) => setNewName(event.target.value)} />
    <MDBBtn outline rounded color='light' onClick={UpdateName}>
       Change
      </MDBBtn>
  </MDBInputGroup>
<div className="p-4" >
<p style={{fontWeight:"1px"}}>Creating a unique username is essential in online platforms to ensure individuality, identity, and effective communication. A unique username not only distinguishes users from one another but also contributes to a personalized online experience. It serves as a digital fingerprint, making it easier for others to identify and remember you within a vast online community.

One key aspect of a unique username is its distinctiveness.
</p>
</div>  </>
  )
};

export default ChangeUsername;
