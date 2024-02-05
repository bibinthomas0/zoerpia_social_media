import React, { useState,useEffect } from "react";
import axios from 'axios'
import { useSelector } from "react-redux";
import PulseCards from "../Main/SkeltonHome";
import PostView from "./PostView";

const baseURL = "http://127.0.0.1:8001";

const RecommendedPost = () => {
    const authentication_user = useSelector((state) => state.authentication_user);
    const [posts,setPosts] = useState([])

    const Postlist = async () => {
      try {
        var data = { "userid": authentication_user.name };
        const res = await axios.get(baseURL + '/api/home/recomendaion/', { params: data });
    
        if (res.status === 200) {
          setPosts(res.data);
        } else if (res.status === 404) {
          console.log('kk');
        } else {
          console.error('Unexpected response:', res);
        }
      } catch (error) {
        console.error('Error fetching posts:', error);
    
        // You can handle specific error types if needed
        if (axios.isAxiosError(error) && error.response) {
          console.error('Response data:', error.response.data);
          console.error('Response status:', error.response.status);
        }
      }
    };
     
  useEffect(() => {
    
    Postlist() 
     
  }, []);
  return (
<>
    {
        posts.length===0
         ?(
      
          <PulseCards/>
        ):(
            
        posts.map((post) => {
      
          return <PostView _id={post._id} user={post.user} image={post.image} content={post.content} likes={post.likes} postlist={Postlist} time={post.created_at} />;
        })
        )}
</>

  )
};

export default RecommendedPost;
