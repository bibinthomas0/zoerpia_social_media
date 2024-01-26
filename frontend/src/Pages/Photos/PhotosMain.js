import React, { useEffect, useState } from "react";
import { Grid, GridItem } from "@chakra-ui/react";

import { useNotification } from "../../Context/WebSocketService";
import PhotoFirstSection from "../../Components/Photos/PhotoFirstSection";
import PhotoSecondSection from "../../Components/Photos/PhotoSecondSection";

function PhotosMain() {
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
    <Grid
      height={"100%"}
      templateColumns="repeat(10, 9.5%)"
      gap={1}
      fontWeight={"bold"}
      bg={"black"}
      color={"white"}
    >
      <GridItem paddingLeft={"7%"} colSpan={{ base: "1", xl: "2" }}>
        <PhotoFirstSection/>
      </GridItem>

      <GridItem colSpan={{ base: "9", xl: "8" }}>
        <PhotoSecondSection/>
      </GridItem>
 
    </Grid>
  );
}

export default PhotosMain;
