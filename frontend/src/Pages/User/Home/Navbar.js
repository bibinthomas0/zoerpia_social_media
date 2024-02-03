import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import {
  Container,
  Box,
  Text,
  Flex,
  Spacer,
  Menu,
  MenuButton,
  IconButton,
  HStack,
  useColorModeValue,
  Link,
  Avatar,
  Image,
  Icon,
  Center,
  Heading,

} from "@chakra-ui/react";
import { FaBell } from "react-icons/fa";
import { MdChatBubble } from "react-icons/md";
import { GiHamburgerMenu } from "react-icons/gi";
import Menubar from "../../../Components/Navbar/Menubar";
import { useSelector } from "react-redux";
import { GiDeerHead } from "react-icons/gi";
import NotifiBar from "../../../Components/Navbar/NotifiBar";
import { VscBellDot, VscBell } from "react-icons/vsc";
import { TbRobot } from "react-icons/tb";
import VirtualFriend from "../../Chat/ai/VirtualFriend";
import {
  MDBDropdown,
  MDBDropdownMenu,
  MDBDropdownToggle,
  MDBDropdownItem,
} from "mdb-react-ui-kit";
import NotStacked from "../../../Components/Notification/NotStacked";
import { ImageSelectContext } from "../../../Context/DisplayImage";


const REACT_APP_CLOUDINARY_CLOUD_NAME = "dvlpq6zex";
const baseURL = "http://127.0.0.1:8001";
const Navbar = () => {
  const [notifi, setNotifi] = useState([]);
  const authentication_user = useSelector((state) => state.authentication_user);
  const [profileimage1, setProfileImage1] = useState("");
  const {displayImage,setDisplayImage} = useContext(ImageSelectContext)


  useEffect(() => {
    console.log('Updated notifications:', notifi);
  }, [notifi]);



  const getprofileImage = async () => {
    try {
      var data = { username: authentication_user.name };
      const res = await axios.post(
        baseURL + "/api/home/getprofilephoto/",
        data
      );

      if (res.status === 202) {
        setProfileImage1(res.data);
        console.log(res.data);
      }
    } catch (error) {
      console.error("Error fetching comments:", error);
    }
  };
  useEffect(() => {
    getprofileImage();
    console.log("image",displayImage)
  }, [displayImage]);

  return (
    <>
  {notifi && notifi.map((event) => (
  <NotStacked
    
    by_user={event.by_user}
    notification_type={event.notification_type}
    post_id={event.post_id}
  />
))}

      <Container maxW="100%" p={{ base: 2 }} bg={"#18191A"} color={"white"}>
        <Flex align="center">
          <HStack ml={"1%"}>
            <Box>
              <Icon
                as={GiDeerHead}
                cursor="pointer"
                fontSize={{ base: "18", xl: "40" }}
              />
            </Box>
            <Box>
              <Link href="/home" passHref>
                <Heading size="lg" fontSize={{ base: "18", xl: "38" }}>
                  {" "}
                  ZORPIA
                </Heading>
                {/* <Box
              w={["100px", "50%", "60%", "300px"]}
            >
              <Image
                w="50%"
                src="https://i.ibb.co/F3Z6c8x/Whats-App-Image-2023-12-08-at-1-36-06-PM.jpg"
                alt="Description"
              />
            </Box> */}
              </Link>
            </Box>
          </HStack>
          <Spacer />
          <MDBDropdown className="shadow-0">
            <MDBDropdownToggle color="dark">
       
              <TbRobot />
            </MDBDropdownToggle>

            <MDBDropdownMenu style={{ backgroundColor: "black" }}>
              <VirtualFriend />
            </MDBDropdownMenu>
          </MDBDropdown>
          <Spacer />
          <Box style={{ marginLeft: "2%" }}>
            <HStack>
              <HStack>
                <Center align="center">
                  <Link href="/chatlist" passHref>
                    <Icon
                      as={MdChatBubble}
                      cursor="pointer"
                      fontSize={{ base: "20", xl: "30" }}
                      mr={{ base: "15%", xl: "50" }}
                    />
                  </Link>

                  {/* <Menu placement="bottom-end">
                    {({ isOpen }) => (
                      <>
                        <MenuButton>
                          <Icon
                            isActive={isOpen}
                            as={VscBellDot}
                            color={"blue"}
                            cursor="pointer"
                            fontSize={{ base: "18", xl: "30" }}
                            mr={{ base: "15%", xl: "50" }}
                          />
                        </MenuButton>

                        <Fade in={isOpen}>
                          <MenuList bg={"#18191A"}>
                            <NotifiBar />`
                          </MenuList>
                        </Fade>
                      </>
                    )}
                  </Menu> */}
                  <HStack mr={{ base: "5", xl: "30" }}>
                    <Avatar
                      size={{ base: "sm", xl: "md" }}
                      name=""
                      src={`https://res.cloudinary.com/${REACT_APP_CLOUDINARY_CLOUD_NAME}/${displayImage ? displayImage :  profileimage1}`}
                      cursor="pointer"
                    />
                    <Text fontSize={{ base: "10", xl: "20" }}>
                      {authentication_user.name}
                    </Text>
                  </HStack>
                </Center>
              </HStack>
              <Box mr={{ base: "10px", xl: "10px" }}>
                <Menu>
                  <MenuButton
                    as={IconButton}
                    aria-label="Options"
                    icon={<GiHamburgerMenu />}
                    transition="all 0.2s"
                    size="md"
                    variant="outline"
                    bg={useColorModeValue("black")}
                    _hover={{ bg: "auto" }}
                    _focus={{ boxShadow: "outline" }}
                  />
                  <Menubar />
                </Menu>
              </Box>
            </HStack>
          </Box>
        </Flex>
      </Container>
    </>
  );
};

export default Navbar;
