import React, { useState, useEffect,useContext } from "react";
import { Flex, Box, Avatar, Text, Button } from "@chakra-ui/react";
import { Image } from "@chakra-ui/react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  Input,
} from "@chakra-ui/react";
import { useSelector} from 'react-redux';
import axios from 'axios'
import { ImageSelectContext } from "../../../Context/DisplayImage";


const REACT_APP_CLOUDINARY_CLOUD_NAME = "dvlpq6zex";
const REACT_APP_CLOUDINARY_UPLOAD_PRESET = "pafqnehk";
const baseURL='http://127.0.0.1:8001'



const ProfileImage = () => {
    const authentication_user = useSelector(state => state.authentication_user)
  const {displayImage, setDisplayImage} = useContext(ImageSelectContext)
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [uploadImage, setUploadImage] = useState("");
  const [loading, setLoading] = useState(false);
  const [coverImageUrl, setCoverImageUrl] = useState("");
  const [profileImageUrl, setProfileImageUrl] = useState("");
  const [profile, setProfile] = useState(false);
  const [showUrl, setShowUrl] = useState("");
  const [content, setContent] = useState("");

  const profileImageUpload = () => {
    setProfile(true);
    onOpen();
    console.log(isOpen);
  };

  const CoverImageUpload = () => {
    setProfile(false);
    onOpen();
  };

  const handleOnChange = (event) => {
    if (event.target.files && event.target.files.length > 0) {
      const reader = new FileReader();
      reader.readAsDataURL(event.target.files[0]);
      reader.onload = function up(e) {
        setUploadImage(reader.result);
      };
    }
  };
  useEffect(() => {
    if (uploadImage.length > 0) {
      uploadImageCloud();
    }
  }, [uploadImage]);

  const uploadCancel = () => {
    setCoverImageUrl("");
    setLoading(false);
    setProfile(false);
    setProfileImageUrl("");
    setShowUrl("");
    setContent("");
    console.log('ffffffffffffffffff');
    setDisplayImage("")
  };
  useEffect(() => {
    if (!isOpen) {
      uploadCancel();
    }
  }, [isOpen]);

  const uploadImageCloud = async () => {
    setLoading(true);
    const data = new FormData();
    data.append("file", uploadImage);
    data.append("upload_preset", REACT_APP_CLOUDINARY_UPLOAD_PRESET);
    data.append("cloud_name", REACT_APP_CLOUDINARY_CLOUD_NAME);
    data.append("folder", "Zorpia-posts");

    try {
      const response = await fetch(
        `https://api.cloudinary.com/v1_1/${REACT_APP_CLOUDINARY_CLOUD_NAME}/image/upload`,
        {
          method: "POST",
          body: data,
        }
      );
      const res = await response.json();

      if (res.public_id) {
        console.log("hhh");
        if (profile) {
          setProfileImageUrl(res.public_id);
          setDisplayImage(res.public_id)
        } else {
          setCoverImageUrl(res.public_id);
        }
        setShowUrl(res.public_id);
        setLoading(false);
      }
    } catch (error) {}
  };

  const CreatePost = async () => {
    if (showUrl.length>0 || content.length>0) {
        let ggg = {
            content: content,
            image: showUrl,
            user: authentication_user.name,
            type: profile ? "profile photo" : "cover photo",
          };
          console.log(ggg)
          
      const res = await axios.post(baseURL + "/api/home/createpost/", ggg);
      if (res.status === 201) {
        
        setLoading(false);
        setProfile(false);
        setShowUrl("");
        setContent("");
        onClose()
      }
    } else {
      
console.log("erorrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrr")

    }
  };

const GetProfileImage = async ()=>{
    console.log('hh');
    try {
        var data = {'username':authentication_user.name}
        const res = await axios.post(baseURL + '/api/home/getprofilephoto/',data)
  
        if (res.status === 202) {
          
          setProfileImageUrl(res.data);
        }
      } catch (error) {
        console.error('Error fetching comments:', error);
      }

}
const GetCoverImage = async ()=>{
 
    try {
        var data = {'username':authentication_user.name}
        const res = await axios.post(baseURL + '/api/home/getcoverphoto/',data)
        console.log('kkkkk')
        if (res.status === 202) {
            console.log('rrrrrrrrrrr') 
          setCoverImageUrl(res.data);
        }
      } catch (error) {
        console.error('Error fetching comments:', error);
      }

} 
  useEffect(() => {
    GetCoverImage() 
  GetProfileImage()

  }, [isOpen,ProfileImage]);
  

  return (
    <Box>
      <Modal
        blockScrollOnMount={false}
        isOpen={isOpen}
        onClose={onClose}
        motionPreset="slideInBottom"
      >
        <ModalOverlay />
        <ModalContent marginTop={"10%"}>
          <ModalHeader>
            {profile ? "Upload Profile Picture" : "Upload Cover Photo"}
          </ModalHeader>
          <ModalCloseButton onClick={uploadCancel} />
          <ModalBody>
            <Box>
              <label style={{ cursor: "pointer" }}>
                <Image
                  src={
                    showUrl
                      ? `https://res.cloudinary.com/${REACT_APP_CLOUDINARY_CLOUD_NAME}/${showUrl}`
                      : "https://content.cdntwrk.com/files/aHViPTYxNjA4JmNtZD1pdGVtZWRpdG9yaW1hZ2UmZmlsZW5hbWU9aXRlbWVkaXRvcmltYWdlXzVkMTNiMTFlYjIyOTkucG5nJnZlcnNpb249MDAwMCZzaWc9NDE1NDJmM2VjYzdhMTY4NjQyZmNhNTExMjdlMTRmMzQ%253D"
                  }
                  alt="Dan Abramov"
                  width="100%"
                  objectFit="cover"
                  height="30%"
                  cursor="pointer"
                />
                <input
                  id="imageInput"
                  type="file"
                  accept="image/*"
                  style={{ display: "none" }}
                  onChange={handleOnChange}
                />
              </label>
            </Box>
            <Input
              variant="flushed"
              placeholder="add caption"
              marginTop={"5%"}
              onChange={(event)=>{setContent(event.target.value)}}
            />
          </ModalBody>

          <ModalFooter>
            <Button mr={3} onClick={onClose}>
              Close
            </Button>
            <Button colorScheme="blue" isLoading={loading} onClick={CreatePost}>
              Upload
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
      <Flex
        padding={"20px"}
        position="relative"
        align="center"
        justify="center"
        width={"100%"}
        height={"70%"}
        overflow="hidden"
        marginTop={'0'}
      >
        <Box
          width={"100%"}
          h={{xl:"300px",base:"240px"}}
          overflow="hidden"
          onClick={CoverImageUpload}
          cursor={"pointer"}
        >
          <Image
            src={
                coverImageUrl
                  ? `https://res.cloudinary.com/${REACT_APP_CLOUDINARY_CLOUD_NAME}/${coverImageUrl}`
                  : "https://content.cdntwrk.com/files/aHViPTYxNjA4JmNtZD1pdGVtZWRpdG9yaW1hZ2UmZmlsZW5hbWU9aXRlbWVkaXRvcmltYWdlXzVkMTNiMTFlYjIyOTkucG5nJnZlcnNpb249MDAwMCZzaWc9NDE1NDJmM2VjYzdhMTY4NjQyZmNhNTExMjdlMTRmMzQ%253D"
              }
            alt="Dan Abramov"
            width={"100%"}
            objectFit="cover"
            height={"80%"}
          />
        </Box>

        <Avatar
          height={{xl:"250px",base:"200px"}}
          w={{xl:"250px",base:"200px"}}
          src={
            profileImageUrl
              ? `https://res.cloudinary.com/${REACT_APP_CLOUDINARY_CLOUD_NAME}/${profileImageUrl}`
              : "https://bit.ly/dan-abramov"
          }
          alt="Dan Abramov"
          position="absolute"
          top="70%"
          left="50%"
          transform="translate(-50%, -50%)"
          onClick={profileImageUpload}
          cursor={"pointer"}
        />
      </Flex>
    </Box>
  );
};

export default ProfileImage;
