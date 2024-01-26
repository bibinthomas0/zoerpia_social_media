import React,{useState} from "react";
// import ProfileImage from "../Small/ProfileImage";
import { Box, Text } from "@chakra-ui/react";
import ProfileDetails from "../profile/Small/ProfileDetails";
import ProfileBody from "../profile/Small/ProfileBody";
import FPprofile from "./small/FPprofile";
import FpPosts from "./small/FpPosts";

const FpSecond = () => {
    const [reloadPosts, setReloadPosts] = useState(false);

const reload = () => {
        setReloadPosts((prevReload) => !prevReload);
      };
  return (
    <Box
      marginBottom={"4"}
      overflow="auto"
      sx={{
        "&::-webkit-scrollbar": {
          width: "5px",
        },
        "&::-webkit-scrollbar-thumb": {
          backgroundColor: "transparent",
        },
      }}
      maxHeight="825px"
    >
      <FPprofile />
      <ProfileDetails reload={reload} />
      <FpPosts key={reloadPosts} />
    </Box>
  );
};

export default FpSecond;
