import React from "react";
import { HStack,Text,Icon,useBreakpointValue,Box, Center } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

function Homesidebar(props) {
  const responsiveTitle = useBreakpointValue({ base: null, xl: props.title, md:props.title });
  const navigate = useNavigate()
    return (

      <HStack
      
      mr={{ base: "5px", xl: "30" }}
      
      height={{ base: "45px", md: "60px", xl: "80px" }}
      _hover={{ bg: "rgb(31, 33, 33)" }}
      transition="all 0.2s"
      cursor="pointer"
      borderRadius="lg"
      width={{ base: "90%", xl: "100%" }}
      padding={'5%'}
      backgroundColor={props.select ? "rgb(31, 33, 33)" : undefined}
      onClick={()=>navigate(props.navigation)}

    >
 <Center>
    { props.icon ?  <Icon
        color="gray.500"
        as={props.icon}
        cursor="pointer"
        fontSize={{ base: "15", xl: "25px" }}
        
      /> : null}
</Center>
<Center paddingTop={'15px'}>
     <Text   fontSize={{  xl: "18px" }} >{responsiveTitle}</Text>
     </Center>
    </HStack>
        
        
          )
}

export default Homesidebar;
