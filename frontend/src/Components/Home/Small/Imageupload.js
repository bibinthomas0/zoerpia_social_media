import React, { useRef, useState } from "react";
import { Input, Image, Flex, Box, Button,Icon } from "@chakra-ui/react";
import { BiImageAdd } from "react-icons/bi";
import { FcAddImage } from "react-icons/fc";

const MultipleImageUpload = ({onImageselected}) => {
const inputRef = useRef();

const handleOnChange = (event) =>{
    if(event.target.files && event.target.files.length > 0){
        const reader  = new FileReader();
        reader.readAsDataURL(event.target.files[0]);
        reader.onload = function up (e) {
            onImageselected(reader.result)
        } 
    }
}

const onChooseing = () =>{
    inputRef.current.click();
}

return (
    <>
    <Input type="file" accept="image/*"
    ref={inputRef}
    onChange={handleOnChange}
    style={{display:'none'}}
    />
       <Icon 
              
              as={FcAddImage}
              cursor="pointer"
              fontSize={{ base: "20px", xl: "40px" }}
              
              onClick={onChooseing}
            />
    
    </>
)


}
export default MultipleImageUpload;
