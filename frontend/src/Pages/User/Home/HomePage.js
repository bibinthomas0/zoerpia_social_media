import React, { useEffect, useState } from "react";
import { Grid, GridItem,Flex, Box } from "@chakra-ui/react";
import FirstSection from "../../../Components/Home/Main/FirstSection";
import Secondsection from "../../../Components/Home/Main/Secondsection";
import ThirdSection from "../../../Components/Home/Main/ThirdSection";
import NotStacked from "../../../Components/Notification/NotStacked";
import { useNotification } from "../../../Context/WebSocketService";

function HomePage() {
  const { socket, Notification } = useNotification();
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    const getSocketNotification = () => {
      if (socket) {
        socket.onmessage = (event) => {
          const data = JSON.parse(event.data);
          console.log(data);
          setNotifications((prevnotifications) => [...prevnotifications, data]);
        };
      }
    };

    getSocketNotification();
  }, [socket]);

  return (
    <Flex
      height={"100%"}
  
      overflow={'hidden'}
      fontWeight={"bold"}
      bg={"black"}
      color={"white"}
    >
      <Box paddingLeft={"7%"} width={{ base: "10%", xl: "20%" }}   >
        <FirstSection />
      </Box>

      <Box width={{ base: "90%", xl: "60%" }}  >
        <Secondsection />
      </Box>
      <Box       width={{ base: 'none', xl: '20%' }}
      style={{ display: { base: 'none', xl: 'block' }}} borderLeft={{ xl: "1px solid grey" }} borderRadius={{base:'15px'}}>
        <ThirdSection />
      </Box>
    </Flex>
  );
}

export default HomePage;
