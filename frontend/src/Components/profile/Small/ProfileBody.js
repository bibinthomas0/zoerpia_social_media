import React from "react";
import {
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  Text,
  Center,
} from "@chakra-ui/react";
import { VStack } from "@chakra-ui/react";
import PostView from "../../Home/Small/PostView";
import { useEffect, useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import FollowList from "./follow";

const baseURL = "http://127.0.0.1:8001";

const ProfileBody = () => {
  const authentication_user = useSelector((state) => state.authentication_user);


  const [posts, setPosts] = useState([]);
  const [following, setFollowing] = useState([]);
  const [followers, setFollowers] = useState([]);
  const Postlist = async () => {
    console.log(authentication_user.name);
    var data = { username: authentication_user.name };
    const res = await axios.post(baseURL + "/api/home/profilelistpost/", data);
    if (res.status === 200) {
      setPosts(res.data);
    }else{
        console.log("error on  postlist")
    }
  };
  useEffect(() => {
    Postlist();
    FollowingUsers();
    FollowersUsers()
  }, [ProfileBody, setFollowing]);

  const FollowingUsers = async () => {
    try {
      var data = { user: authentication_user.name };
      const res = await axios.post(baseURL + "/api/home/followingList/", data);
      if (res.status === 202) {
        setFollowing(res.data);
        console.log("vvvvvvvvvvv", following);
      }
    } catch (error) {
      console.log(error);
    }
  };
  const FollowersUsers = async () => {
    try {
      var data = { user: authentication_user.name };
      const res = await axios.post(baseURL + "/api/home/followersList/", data);
      if (res.status === 202) {
        setFollowers(res.data);
        console.log("vvvvvvvvvvv", followers);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const PostsPr = () =>{
    FollowingUsers();
    FollowersUsers()

  }

  return (
    <Tabs isFitted variant="enclosed" borderColor={'black'}>
      <TabList mb="1em">
        <Tab>Posts</Tab>
        <Tab>Following</Tab>
        <Tab>Followers</Tab>
      </TabList>
      <TabPanels>
        <TabPanel>
          {posts.length === 0 ? (
            <Text>No post available</Text>
          ) : (
            posts.map((post) => {
              return (
                <PostView
                  _id={post._id}
                  user={post.user}
                  image={post.image}
                  content={post.content}
                  likes={post.likes}
                  postlist={Postlist}
                  time={post.created_at} 
                />
              );
            })
          )}
        </TabPanel>
        <TabPanel>
          <VStack>
            {following.map((username) => (
              <FollowList key={username} username={username} PostsPr={PostsPr} />
            ))}
          </VStack>
        </TabPanel>
        <TabPanel>
        <VStack>
            {followers.map((username) => (
              <FollowList key={username} username={username} PostsPr={PostsPr} />
            ))}
          </VStack>
        </TabPanel>
      </TabPanels>
    </Tabs>
  );
};

export default ProfileBody;
