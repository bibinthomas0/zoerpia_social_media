import React, { useState } from "react";
import {
  Container,
  FormControl,
  Input,
  Stack,
  Button,
  Heading,
  VStack,
  Center,
  Link,Text,Wrap,WrapItem
} from '@chakra-ui/react';
import { useToast } from '@chakra-ui/react'
import { BiLockAlt } from 'react-icons/bi';
import axios from 'axios'
import Otp from "../../../Components/Forgotpassword/Otp";


const ForgotPassword = () => {
  const baseURL = "http://127.0.0.1:8000";
  const [Email,setEmail] = useState("")
  const toast = useToast()
  const [otps,setOtp] = useState("")
  const [loading,setLoading] = useState(false)
  const HandleEmail  = async () =>{
      console.log(otps.length);
    try {
      setLoading(true)
      var data = {'email':Email}
      const res = await axios.post(baseURL + '/api/accounts/forgotpassword/', data,
      );

      if (res.status === 202) {
        console.log(res.data);
        setLoading(false)
        const mesg = {'status':"success","title":`An OTP sended to ${Email}`}
        ToastStatusExample(mesg)
        setOtp(res.data)
        console.log(res.data) 
      }
    } catch (error) {
      const mesg = {'status':"error","title":"invalid email address"}
      ToastStatusExample(mesg)
      setLoading(false)
    }



  }
  function ToastStatusExample(mesg) {

  
      return (
      <Wrap>
      
          <WrapItem >
        
             {   toast({
                  title: mesg.title,
                  status:mesg.status,
                  isClosable: true,
                  position: "top",
                })
         
             }
       
          </WrapItem>

      </Wrap>
    )
  }


  return (
    <>
      {otps ==="" ? (
        <Container maxW="7xl" p={{ base: 5, md: 10 }}>
          <Center>
            <Stack spacing={4}>
              <Stack align="center">
                <Heading fontSize="3xl">Forgot password</Heading>
              </Stack>
              <VStack as="form" spacing={8} w={{ base: 'sm', sm: 'lg' }} p={{ base: 5, sm: 6 }}>
                <VStack spacing={0} w="100%">
                  <Text color={'gray.500'}>Enter the email that you are registered.</Text>
                  <FormControl id="email">
                    <Input
                      type="email"
                      placeholder="Email Address"
                      rounded="md"
                      borderBottomLeftRadius="0"
                      borderBottomRightRadius="0"
                      onChange={(event) => setEmail(event.target.value)}
                    />
                  </FormControl>
                </VStack>
                <VStack w="100%">
                  <Button
                    leftIcon={<BiLockAlt />}
                    bg="green.300"
                    color="white"
                    _hover={{
                      bg: 'green.500',
                    }}
                    isLoading={loading}
                    loadingText="Submitting"
                    rounded="md"
                    w="100%"
                    onClick={HandleEmail}
                  >
                    Verify account
                  </Button>
                </VStack>
              </VStack>
            </Stack>
          </Center>
        </Container>
      ) : (
        <Otp authotp={otps} email={Email} />
      )}
    </>
  );
  
};



export default ForgotPassword;

