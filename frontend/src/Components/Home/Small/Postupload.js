import React, { useEffect, useState } from "react";
import { useSelector} from 'react-redux';
import ChipsPost from "./ChipsPost";
import {
  Center,
  Box,
  Input,
  Icon,
  Flex,
  Button,
  Avatar,
  AvatarBadge
} from "@chakra-ui/react";
import MultipleImageUpload from "./Imageupload";
import Imagecropper from "./Imagecropper";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
} from "@chakra-ui/react";
import { useDisclosure } from "@chakra-ui/react";
import { MdClose } from "react-icons/md";
import axios, { isCancel } from 'axios'
import { useToast } from '@chakra-ui/react'

const REACT_APP_CLOUDINARY_CLOUD_NAME = "dvlpq6zex";
const REACT_APP_CLOUDINARY_API_KEY = "819793121816654";
const REACT_APP_CLOUDINARY_API_SECRET = "o7jvARVAcbb9LCVt2VWz4SDlW7w";
const REACT_APP_CLOUDINARY_UPLOAD_PRESET = "pafqnehk";

function Postupload (props) {
  const toast = useToast()

const authentication_user = useSelector(state => state.authentication_user)
  const [image, setImage] = useState("");
  const { isOpen, onOpen, onClose } = useDisclosure();
  const finalRef = React.useRef(null);
  const [imageAfterCrop, setImageAfterCrop] = useState("");
  const [url, setUrl] = useState("");
  const [content, setContent] = useState("");
  const baseURL='http://127.0.0.1:8001'
  const [loading,setloading] = useState(false)
  const [profileimage,setProfileImage] = useState("")
  const [chipsmodal,setChipsModal] = useState(false)
  const [chips,setChips] = useState([])
  const [chipsVald,setChipsValid] = useState(false)


  useEffect(()=>{

if(chips.length>2){
  setChipsValid(true)
}
console.log(chips)
  },[chips])

  const OpenChips = () => {
    setChipsModal((prevChipsModal) => !prevChipsModal);
  };


  const getprofileImage = async ()=>{
    try {
        var data = {'username':authentication_user.name}
        const res = await axios.post(baseURL + '/api/home/getprofilephoto/',data)
  
        if (res.status === 202) {
          
          setProfileImage(res.data);
        }
      } catch (error) {
        console.error('Error fetching comments:', error);
      }

} 
useEffect(() => {
getprofileImage() 
}, []);




  const CreatePost = async (data) =>{
    
    if(data){
      setloading(true)
      let ggg = {"content":content,"image":data,'user':authentication_user.name ,"type":"post",'chips':chips}
      const res = await axios.post(baseURL+'/api/home/createpost/', ggg)
      if (res.status===201){
        PostToast();
        onCropCancel()
        setContent("")
        setloading(false)
        setChips([]) 
    
      }
    }else{

      if(content.length>0){
        setloading(true)
      const ggg = {"content":content,'user':authentication_user.name,"type":"post"}
      const res = await axios.post(baseURL+'/api/home/createpost/', ggg)
      if (res.status===201){ 
        setloading(false)
        PostToast();
        onCropCancel()
        setContent("")
    }}
    
  }
  }

  const PostToast= ()=>{
    toast({
      title: 'Post uploaded succesfully.',
      status: 'success',
      duration: 4000,
      position:"top",
      isClosable: true,
      colorScheme:"green"
    })
    props.postlist()
    setloading(false)
  }


  const uploadImage = async () => {
    if(!chipsVald){

OpenChips()
    }else{
      setChipsModal(false)
    setloading(true)
    const data = new FormData();
    data.append("file", imageAfterCrop);
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
      setUrl(res.public_id);
      if(res.public_id){
        CreatePost(res.public_id)
      }
      
    } catch (error) {}

  }

  };
  const onImageselected = (selectedimage) => {
    setImage(selectedimage);
    onOpen();
  };


  const onCropDone = (imgCroppedArea) => {
    const canvasEle = document.createElement("canvas");
    canvasEle.width = imgCroppedArea.width;
    canvasEle.height = imgCroppedArea.height;

    const context = canvasEle.getContext("2d");
    let imageObj1 = new Image();
    imageObj1.src = image;
    imageObj1.onload = function () {
      context.drawImage(
        imageObj1,
        imgCroppedArea.x,
        imgCroppedArea.y,
        imgCroppedArea.width,
        imgCroppedArea.height,
        0,
        0,
        imgCroppedArea.width,
        imgCroppedArea.height
      );

      const dataURL = canvasEle.toDataURL("image/jpeg");
      setImageAfterCrop(dataURL);
      onClose();
      
    };
  };
  const onCropCancel = () => {
 
    setImage("");
    setImageAfterCrop("");
    onClose();
  };
 const ImageOpen = () =>{

  if(imageAfterCrop.length === 0){
    onCropCancel()
  }else{
    onOpen()
  }

 }
  

  return (
    <>
      <>
        <Flex h="120px" gap={4} padding={"1%"} ref={finalRef}  zIndex={2} color={'white'} borderRadius={'10px'} boxShadow='xl' borderColor={'blue.100'}>
          <Center colSpan={1}>
            <Avatar
              size={{sm:"md",md:"xl",xl:"xl", base:"md"}}
              objectFit="cover"
              src={`https://res.cloudinary.com/${REACT_APP_CLOUDINARY_CLOUD_NAME}/${profileimage}`} 
              alt="Dan Abramov"
            />
          </Center>
          <Box colSpan={8} bg="gray.10" width={"100%"}>
            <Flex height={"100%"}>
              <Center width={"80%"}>
              <Input
      placeholder="Create new post..."
      height={{ sm: '30%', md: '50%', xl: '100%' }}
      onChange={(event) => setContent(event.target.value)}
      value={content}
      background={"#18191A"}
      borderColor={"#18191A"}   
       
     
    />
              </Center>
              <Box
                display="flex"
                alignItems="center"
                justifyContent="center"
                width={"10%"}
              >
                <MultipleImageUpload onImageselected={onImageselected} />
              </Box>
              <Box display="flex" alignItems="center" justifyContent="center">
              <Button colorScheme="blue" size={{xl:"md",base:"xs",md:"xs"}} onClick={() => imageAfterCrop.length > 0 ? uploadImage() : CreatePost(null)} isLoading={loading}>
                  Post
                </Button>
              </Box> 
            </Flex>
          </Box>
        </Flex>
      </>
      <Modal finalFocusRef={finalRef} isOpen={isOpen} onClose={onClose} >
        <ModalOverlay />
        <ModalContent >
          <ModalHeader>Modal Title</ModalHeader>
          <ModalCloseButton />
          <ModalBody >
          <Flex className="cropper" padding={'2%'}>
            <Imagecropper
              image={image}
              onCropDone={onCropDone}
              onCropCancel={onCropCancel}
            /></Flex>
          </ModalBody>
        </ModalContent>
      </Modal>
      <Modal isOpen={chipsmodal} isCentered onClose={OpenChips}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Add Tags To Continue</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <ChipsPost setChips={setChips} chips={chips}/>
          </ModalBody>
          <ModalFooter>
            <Button onClick={uploadImage}>Add</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
      {imageAfterCrop.length > 1 && (
        <Avatar
          boxSize="100px"
          objectFit="cover"
          src={imageAfterCrop}
          alt="profile image"
          onClick={ImageOpen}
          zIndex={'2'}
        >
          <AvatarBadge
            border="none"
            fontSize="1.25em"
            color="gray"
            as={MdClose}
            onClick={onCropCancel}
            cursor={"pointer"}
            zIndex={'5'}
          />
        </Avatar>
      )}
    </>
  );
}

export default Postupload;
