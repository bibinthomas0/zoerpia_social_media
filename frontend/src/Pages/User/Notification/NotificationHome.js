import React from "react";
import { Grid, GridItem,Flex, Box } from "@chakra-ui/react";
import NotificationFirst from "../../../Components/NotificationHome/NotificationFirst";
import NotificationSecond from "../../../Components/NotificationHome/NotificationSecond";

function NotificationHome() {




  return (
    <Flex
      height={"100%"}
  
      overflow={'hidden'}
      fontWeight={"bold"}
      bg={"black"}
      color={"white"}
    >
      <Box paddingLeft={"7%"} width={{ base: "10%",md:'10%',lg:"20px", xl: "20%" }}   >
       <NotificationFirst/>
      </Box>

      <Box width={{ base: "89%", xl: "60%" }} style={{paddingLeft:"0px"}}  >
        <NotificationSecond/>
      </Box>

    </Flex>
  );
}

export default NotificationHome;

