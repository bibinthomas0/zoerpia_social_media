import { Center, Flex, Text, VStack } from "@chakra-ui/react";
import React, { useState, useEffect } from "react";
import BioStatus from "./BioStatus";
import {
  Editable,
  EditableInput,
  EditableTextarea,
  EditablePreview,
} from "@chakra-ui/react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import axios from "axios";
import { BsFillChatTextFill } from "react-icons/bs";
import { useNavigate } from "react-router-dom";

const baseURL = "http://127.0.0.1:8001";
const ProfileDetails = (props) => {
  const navigate = useNavigate();
  const [userDetails,setUserDetails] = useState()
  const authentication_user = useSelector((state) => state.authentication_user);
  const { username } = useParams();
  const [follow, SetFollow] = useState(false);
  var datas = {username :username }
  const handleClick = () => {
    navigate("/chatlist", { state: datas });
  };
  const FetchUserdetails = async () =>{
    try {
      var data = {'username':username ? username : authentication_user.name}
      const res = await axios.get("http://127.0.0.1:8000" + '/api/accounts/userdetail/',{ params: data } )

      if (res.status === 200) {
        
        setUserDetails(res.data);
      }
    } catch (error) {
      console.error('Error fetching comments:', error);
    }


  }






  const fetchfollow = async () => {
    var data = { user: authentication_user.name, author: username };
    const res = await axios.post(baseURL + "/api/home/checkfollow/", data);
    if (res.status === 200) {
      SetFollow(true);
    } else {
      SetFollow(false);
    }
  };
  const followManagement = async () => {
    var data = {
      following_user: authentication_user.name,
      followed_user: username,
    };
    const res = await axios.post(baseURL + "/api/home/follow/", data);
    if (res.status === 200) {
      fetchfollow();
      props.reload();
    }
  };

  useEffect(() => {
    fetchfollow();  
    FetchUserdetails()    
  }, []);

  return (
    <>
      <VStack paddingTop={"5px"}>
        <Text fontSize={{ xl: "35px", base: "18px" }}>{userDetails && userDetails.name}</Text>
        <Text fontSize="20px" fontWeight="bold">{`@${
          username ? username : authentication_user.name
        }`}</Text>
        <Editable defaultValue="Immortal">
          <EditablePreview />
          <EditableTextarea />
        </Editable>
        {username && (
          <>
            <Flex marginBottom={"3"}>
              {follow&& 
              <button
                type="button"
                class="btn btn-dark mr-3"
                data-mdb-ripple-init
                onClick={handleClick}
              >
               <BsFillChatTextFill  size={'30px'} />
              </button> }
              <button
                type="button"
                class="btn btn-light"
                data-mdb-ripple-init
                data-mdb-ripple-color="dark"
                onClick={followManagement}
              >
                {follow ? "Unfollow" : "Follow"}
              </button>
            </Flex>
          </>
        )}
      </VStack>
    </>
  );
};

export default ProfileDetails;
