import React from "react";
import { Flex,Box,Stack, Container,Center,Spacer } from "@chakra-ui/react";
import ChatUsers from "../../Components/Chat/ChatUsers";
import DrawerExample from "../../Components/Chat/Chatbox";
import ChatPage from "../../Components/Chat/Chatbox";

const ChatList = () => {

  return (
    <Center backgroundColor={'black'} color={'white'} >
         

<Flex width={'90%'} >


<Stack  w={'30%'} padding={'10px'} >

<ChatUsers />

</Stack>
<Spacer />
<Box  w={'68%'} paddingRight={'27px'}  height={'840px'} >
<ChatPage/>


</Box>


</Flex>




    </Center>




  )
};

export default ChatList;
