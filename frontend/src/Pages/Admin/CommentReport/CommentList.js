import { Fragment, useState, useEffect } from "react";
import {
  Container,
  Flex,
  Stack,
  VStack,
  Icon,
  Divider,
  useColorModeValue,
  Avatar,
  Text,
  Box,
  useDisclosure,
  Collapse,
  Button,
} from "@chakra-ui/react";
import { Heading } from "@chakra-ui/react";
import axios from "axios";
import ReportedComments from "./ReportedComments";



const baseURL = "http://127.0.0.1:8001";
const NotificationsList = () => {
  const [repoComments, setRepoComments] = useState([]);

  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    try {
      const res = await axios.get(baseURL + "/api/home/reportedcomments/");
      setLoading(false);
      if (res.status === 200) {
        setRepoComments(res.data);
        console.log(res.data);
        setLoading(true);
      }
    } catch (error) {
      console.error("Error fetching reported comments:", error);
      setLoading(false);
    }
  };



  useEffect(() => {
  

    fetchData();
  }, []);

  useEffect(() => {
    console.log(repoComments);
  }, [loading]);

  return (
    <Container maxW="7xl" p={{ base: 5, md: 10 }} marginTop={"1%"}>
      <Heading as="u">Reported Comments</Heading>
      <VStack
        marginTop={"2%"}
        boxShadow={useColorModeValue(
          "2px 6px 8px rgba(160, 174, 192, 0.6)",
          "2px 6px 8px rgba(9, 17, 28, 0.9)"
        )}
        bg={useColorModeValue("gray.100", "gray.800")}
        rounded="md"
        overflow="hidden"
        spacing={0}
      >
        {loading &&
          repoComments.map((data) => (
            <ReportedComments
              commenter={data.commenter}
              reported_by={data.reported_by}
              id={data.comment_id}
              _id={data._id} 
              verified={data.verified}
              fetchData={fetchData}
            />
          ))}
      </VStack>
    </Container>
  );
};

export default NotificationsList;
