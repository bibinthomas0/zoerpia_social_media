import React from "react";
import { Flex,Box,Stack, Container,Center,Spacer } from "@chakra-ui/react";
import PostSidebar from "./PostSidebar";
import RepPostList from "./RepPostList";

const PostReport = () => {
  return (

<Center >
         

         <Flex width={'98%'} >
         
         
         <Stack  w={'15%'} padding={'1px'} >
         
         <PostSidebar/>
         
         </Stack>
         <Spacer /> 
         <Box  w={'90%'} paddingRight={'27px'}  overflow="auto"  sx={{
    '&::-webkit-scrollbar': {
      width: '5px', 
    },
    '&::-webkit-scrollbar-thumb': {
      backgroundColor: 'transparent',
    },
  }} maxHeight="750px">
         
       <RepPostList/>
  
         
         </Box>
         
         
         </Flex>
         
         
         
         
             </Center>



  )
};

export default PostReport;
