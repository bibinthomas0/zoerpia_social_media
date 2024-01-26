import { Flex,Box,Stack, Container,Center,Spacer } from "@chakra-ui/react";
import React from "react";
import UserTable from "./UserTable";
import Sidebar from "../../../Components/Admin/Sidebar";

const UserList = () => {
  return (
    <Center >
         

    <Flex width={'98%'} >
    
    
    <Stack  w={'15%'} padding={'1px'} >
    
    <Sidebar/>
    
    </Stack>
    <Spacer /> 
    <Box  w={'90%'} paddingRight={'27px'} >
    
  
    <UserTable/>
    
    </Box>
    
    
    </Flex>
    
    
    
    
        </Center>




  )
};

export default UserList;


