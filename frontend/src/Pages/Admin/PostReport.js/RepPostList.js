import { Fragment, useState, useEffect } from "react";
import { Container, Text, Stack, Avatar, Divider, Icon,Heading } from '@chakra-ui/react';
import { ImQuotesLeft } from 'react-icons/im';
import axios from "axios";
import ReportedPost from "./ReportedPost";












const REACT_APP_CLOUDINARY_CLOUD_NAME = "dvlpq6zex";
const baseURL = "http://127.0.0.1:8001";

const RepPostList = () => {

    const [repoPosts, setRepoPosts] = useState([]);

    const [loading, setLoading] = useState(true);
  
    const fetchData = async () => {
      try {
        const res = await axios.get(baseURL + "/api/home/reportedposts/");
        setLoading(false);
        if (res.status === 200) {
            setRepoPosts(res.data);
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
  




  return (
    <Container maxW="6xl" py={10} px={{ base: 5, md:5  }}>
    <Heading as="u">Reported Posts</Heading>
      {repoPosts.map((obj) => (
        <ReportedPost post={obj.post_id} id={obj._id} verified={obj.verified} reported_by={obj.reported_by} fetchData={fetchData} />
      ))}
    </Container>
  );
};

export default RepPostList;