import React from "react";
import { HStack,Text,Icon } from "@chakra-ui/react";


function sidebar(props) {
  return (

<HStack
            mr={{ base: "5", xl: "30" }}
            pl={{ base: "3", xl: "30" }}
            height={{ base: "25px", xl: "100px" }}
            _hover={{ bg: "grey", color: "white" }}
            transition="all 0.2s"
            cursor="pointer"
            borderRadius="xl"
          >
            <Icon
              color="gray.500"
              as={props.icon}
              cursor="pointer"
              fontSize={{ base: "15", xl: "30" }}
              mr={{ base: "15px", xl: "50" }}
            />
            <Text fontSize={{ base: "10", xl: "25" }}>{props.title}</Text>
          </HStack>


  )
}

export default sidebar;
