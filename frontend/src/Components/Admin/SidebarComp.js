import React from "react";
import { Flex, useColorModeValue, Icon } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";



const SidebarComp = (props) => {
    const navigate = useNavigate()
  return (
    <Flex
      align="center"
      px="4"
      py="3"
      marginTop={"40px"}
      cursor="pointer"
      role="group"
      fontSize={"20px"}
      fontWeight="bold"
      transition=".15s ease"
      _hover={{
        bg: useColorModeValue("blue.500", "red"),
        color: useColorModeValue("white", "gray.200"),
      }}
      borderRadius={"10px"}
      bg={props.selected && "gray"}
      color={props.selected && "white"}
      onClick={()=>navigate(props.navigation)}


    >
      <Icon mx="2" boxSize="4" as={props.icon} />
      {props.name}
    </Flex>
  );
};

export default SidebarComp;
