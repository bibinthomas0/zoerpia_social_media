import React from "react";
import {
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  Text,
  Center,
} from "@chakra-ui/react";
import { VStack } from "@chakra-ui/react";
import PostView from "../../Home/Small/PostView";
import { useEffect, useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import { useParams } from 'react-router-dom';


const baseURL = "http://127.0.0.1:8001";

const FpPosts = () => {
  const authentication_user = useSelector((state) => state.authentication_user);

  const { username } = useParams();
  const [posts, setPosts] = useState([]);

  const Postlist = async () => {
    var data = { username: username };
    const res = await axios.post(baseURL + "/api/home/profilelistpost/", data);
    if (res.status === 200) {
      setPosts(res.data);
    }else{
        console.log("error on  postlist")
    }
  };
  useEffect(() => {
    Postlist();
   
  }, [FpPosts]);



  return (
  
     <>
          {posts.length === 0 ? (
            <Text>No post available</Text>
          ) : (
            posts.map((post) => {
              return (
                <PostView
                  _id={post._id}
                  user={post.user}
                  image={post.image}
                  content={post.content}
                  likes={post.likes}
                  postlist={Postlist}
                />
              );
            })
          )}
       </>
      
  );
};

export default FpPosts;
