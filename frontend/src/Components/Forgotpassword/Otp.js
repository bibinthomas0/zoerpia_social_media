import React, { useState } from "react";
import {
  PinInput,
  PinInputField,
  HStack,
  Center,
  Box,
  Container,
  AbsoluteCenter,
  Flex,
  Stack,
  useToast,
  useColorModeValue,
  Text,
  Heading,
  Button,
  Wrap,
  WrapItem,
} from "@chakra-ui/react";
import axios from "axios";
import ChangePassword from "./ChangePassword";

const Otp = (props) => {
  const baseURL = "http://127.0.0.1:8000";
  const [userOtp, setUserOtp] = useState("");
  const toast = useToast();
  const [pass, setPass] = useState(false);
  const [loading, setLoading] = useState(false);

  const HandleOtp = async () => {
    try {
      setLoading(true);
      var data = { "otp": userOtp,'authotp':props.authotp };
      const res = await axios.post(
        baseURL + "/api/accounts/otpvalidation/",
        data
      );

      if (res.status === 202) {
        setLoading(false);
        setPass(true);
      }
    } catch (error) {
      const mesg = { status: "error", title: "invalid otp try again" };
      ToastStatusExample(mesg);
      setLoading(false);
    }
  };

  function ToastStatusExample(mesg) {
    return (
      <Wrap>
        <WrapItem>
          {toast({
            title: mesg.title,
            status: mesg.status,
            isClosable: true,
            position: "top",
          })}
        </WrapItem>
      </Wrap>
    );
  }

  return (
    <Flex minH={"100%"} justify={"center"} pt={"45px"} backdropColor={"white"}>
    <Box
      rounded={"lg"}
      bg={useColorModeValue("white", "gray.700")}
      boxShadow={"lg"}
      p={8}
      width={"800px"}
      height={"40%"}
      mt={"5%"}
    >
      {pass === false ? (
        <>
          <Stack align={"center"} margin={"25px"}>
            <Heading fontSize={"1xl"}>Verify Otp</Heading>
          </Stack>
  
          <Stack spacing={4}>
            <Text color={"red"}></Text>
  
            <Stack align={"center"}>
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
  
            <Stack align={"center"}>
              <Button
                isLoading={loading}
                loadingText="Submitting"
                bg={NaN}
                width={"20%"}
                border={"1px"}
                color={"green"}
                _hover={{
                  bg: "green.500",
                  color: "white",
                }}
                onClick={HandleOtp}
              >
                verify
              </Button>
            </Stack>
          </Stack>
        </>
      ) : (
        <ChangePassword email={props.email}/>
      )}
    </Box>
  </Flex>
  
  );
};

export default Otp;
