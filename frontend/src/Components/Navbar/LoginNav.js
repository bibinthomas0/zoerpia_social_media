import React from "react";
import { Stack, Avatar } from "@chakra-ui/react";

function LoginNav() {
  return (
    <>
      <Stack
        height={"100px"}
        align={"center"}
        justify={"center"}
        borderBottom={"1px"}
        color={"black"}
        as="nav"
   
      >
        <Avatar
          src="https://i.ibb.co/SRt6cXm/Zorpia-prev-ui.png"
          height={"100px"}
          width={"300px"}
        />
      </Stack>
    </>
  );
}

export default LoginNav;
