import React, { useState,useEffect } from "react";
import axios from 'axios'
import Postupload from "../Small/Postupload";
import PostView from "../Small/PostView";
import { Box, Text } from "@chakra-ui/react";
import PulseCards from "./SkeltonHome";
import { Tabs, TabList, TabPanels, Tab, TabPanel } from '@chakra-ui/react'
import RecommendedPost from "../Small/RecommendedPost";
import { useSelector } from "react-redux";

const baseURL='http://127.0.0.1:8001'

function Secondsection() {
  const authentication_user = useSelector((state) => state.authentication_user);
  const [posts,setPosts] = useState([])
  const [loading,setloading] = useState(false)


  const Postlist = async () => {
    setloading(true)
    try {
      var data = { "userid": authentication_user.name };
      const res = await axios.get(baseURL + '/api/home/listpost/', { params: data });
      
      if (res.status === 200) {
        setPosts(res.data);
        setloading(false)
      }else if (res.status === 404){ 
        console.log('errr'); 
      }
    } catch (error) {
      console.error("Error fetching posts:", error);
      setloading(false)
    }
  };
  
  useEffect(() => {
    Postlist();
  }, [Secondsection]);
  
  

  return (<Box marginBottom={'4'}  overflow="auto"  sx={{
    '&::-webkit-scrollbar': {
      width: '5px', 
    },
    '&::-webkit-scrollbar-thumb': {
      backgroundColor: 'transparent',
    },
  }} 
  height={'825px'}
  maxHeight="100vh"
  padding={'1%'}
  >


 

    <Postupload postlist={Postlist}/>
    <Tabs isFitted variant='enclosed' marginTop={'2%'} >
  <TabList mb='1em' borderColor={'black'}>
    <Tab>Following</Tab>
    <Tab>Recommended</Tab>
  </TabList>
  <TabPanels>
    <TabPanel>
    {
  loading ?(

    <PulseCards/>
  ): posts.length ===0?(<div>No post available</div>):(
  posts.map((post) => {

    return <PostView key={post._id} _id={post._id} user={post.user} image={post.image} content={post.content} likes={post.likes} postlist={Postlist} time={post.created_at} />;
  })
  )
  
  }
    </TabPanel>
    <TabPanel>
    <RecommendedPost/>
    </TabPanel>
  </TabPanels>
</Tabs>
 

 




</Box>
  )
}

export default Secondsection;
