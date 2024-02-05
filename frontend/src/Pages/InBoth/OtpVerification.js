import React, { useState, useEffect } from "react";
import {
  Flex,
  Box,
  FormControl,
  FormLabel,
  Input,
  Stack,
  Button,
  Heading,
  Text,
  useColorModeValue,
  HStack,
} from "@chakra-ui/react";
import { PinInput, PinInputField } from '@chakra-ui/react'
import Countdown from 'react-countdown';
import { useSelector,useDispatch } from "react-redux";
import { Link ,useNavigate} from 'react-router-dom'
import axios from 'axios'
import { setUser_registration } from "../../Redux/User/UserRegdetails";



function OtpVerification() {
    const breakpoints = {
        base: "0em", // 0px
        sm: "30em", // ~480px. em is a relative unit and is dependant on the font size.
        md: "48em", // ~768px
        lg: "62em", // ~992px
        xl: "80em", // ~1280px
        "2xl": "96em", // ~1536px
      };
      const dispatch = useDispatch();
      const [userOtp,setUserOtp] = useState("")
      const userRegDetails = useSelector(state => state.User_registration)
      const [formError, setFormError] = useState("")
      const navigate = useNavigate();
      const baseURL='http://127.0.0.1:8000'
      const [Otp,setOtp] = useState("")
      const [seconds, setSeconds] = useState(59);
      
    
      
   

    

const validateOtp = async () =>{
  try {
    let data ={"otp":userOtp,'email':userRegDetails.email} 
    const res = await axios.post(baseURL+'/api/accounts/otpvalidation/',data )
    if(res.status === 202){
      handleRegistration()
      console.log('validated')
 
    
  }}
  catch (error) {
    
    if (error.response.status===406)
    {
 
      setFormError(error.response.data)
    }
    else
    {
      console.log(error);

    }
  }

}





      const handleRegistration = async () =>{
  
          try {
            const res = await axios.post(baseURL+'/api/accounts/register/', userRegDetails)
            if(res.status === 201){
              dispatch(setUser_registration({
                name: null,
            username: null,
            email: null,
            dob: null,
            password: null,
            otp:null
              }))
              navigate('/',
              {
                state:res.data.Message
              })
              return res
            }  
            
          }
          catch (error) {
            
            if (error.response.status===406)
            {
         
              setFormError(error.response.data)
            }
            else
            {
              console.log(error);
        
            }
          }
      }



      const resendOtp = async () =>{
        const data = {
          email: userRegDetails.email
          
        };
        try {
          const res = await axios.post(baseURL + "/api/accounts/otp/", data);
          if (res.status === 201) {
    console.log('sended')
       
        
             
          } 
        }catch (error) {
          if (error.response.status === 406) {
     
            setFormError(error.response.data);
          } else {
            console.log(error);
          }
        }


      }
      useEffect(() => {
        const timer = setInterval(() => {
          setSeconds((prevSeconds) => prevSeconds - 1);
        });
      }, []);
 


  return (
    <>
    <Flex
      minH={"100%"}
      justify={"center"}
      pt={"45px"}
      backdropColor={"white"}
  >
      <Box
        rounded={"lg"}
        bg={useColorModeValue("white", "gray.700")}
        boxShadow={"lg"}
        p={8}
        width={"800px"}
        height={"40%"}
        mt={'5%'}
      >
        <Stack align={"center"} margin={'25px'}>
          <Heading fontSize={"1xl"}>Verify Otp</Heading>
        </Stack>

        <Stack spacing={4}  >
      
            <Text color={"red"} >
                  {formError}
                </Text>
    
            <Stack  align={'center'}>
            <HStack>
  <PinInput onChange={(value) => setUserOtp(value)}>
    <PinInputField />
    <PinInputField />
    <PinInputField />
    <PinInputField />
    <PinInputField />
    <PinInputField />
  </PinInput>
</HStack>
          </Stack>
          <Stack  align={'center'}>
            <Button
              bg={NaN}
              width={"20%"}
              border={"1px"}
              color={"green"}
              _hover={{
                bg: "green.500",
                color: "white",
              }}
              onClick={validateOtp}
            >
              verify 
            </Button>
          </Stack>
          <Stack
            direction={{ base: "column", sm: "row" }}
            align={"start"}
            justify={"space-between"}
          >
            {seconds > 0?(<Text color={"blue.400"}>Resend otp in {seconds}s</Text>):
            <Button onClick={resendOtp} color={"grey"}>resend</Button>}
            

          </Stack>
        </Stack>
      </Box> 
    </Flex>
  </>
  )
}
export default OtpVerification;
