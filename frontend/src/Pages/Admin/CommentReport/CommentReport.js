import React from "react";
import { Flex, Box, Stack, Container, Center, Spacer } from "@chakra-ui/react";
import CommentSidebar from "./CommentSidebar";
import CommentList from "./CommentList";

const CommentReport = () => {
  return (
    <Center>
      <Flex width={"98%"}>
        <Stack w={"15%"} padding={"1px"}>
          <CommentSidebar />
        </Stack>
        <Spacer />
        <Box w={"90%"} paddingRight={"27px"}  overflow="auto"  sx={{
    '&::-webkit-scrollbar': {
      width: '5px', 
    },
    '&::-webkit-scrollbar-thumb': {
      backgroundColor: 'transparent',
    },
  }} maxHeight="750px">
          <CommentList />
        </Box>
      </Flex>
    </Center>
  );
};

export default CommentReport;
