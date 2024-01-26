import { useState } from "react";
import {
  Container,
  FormControl,
  FormLabel,
  Input,
  Stack,
  Button,
  Heading,
  useColorModeValue,
  VStack,
  Center,
  InputGroup,
  InputRightElement,
  Checkbox,
  Link,
  Wrap,
  WrapItem,
 useToast
} from "@chakra-ui/react";
import axios from 'axios'
import { useNavigate } from "react-router-dom";




const ChangePassword = (props) => {
    const navigate =useNavigate()
  const [show, setShow] = useState(false);
  const handleClick = () => setShow(!show);
  const [newPass, setNewPass] = useState("");
  const [confpass, setConfPass] = useState("");
  const baseURL = "http://127.0.0.1:8000";
  const toast = useToast();
  const [loading, setLoading] = useState(false);

  const HandlePassword = async () => {
    if (newPass !== confpass) {
        console.log(newPass,confpass);
      const mesg = { status: "error", title: "passwords are not matching" };
      ToastStatusExample(mesg);
    } else {
      try {
        setLoading(true);
        var data = { password: confpass, email: props.email };
        const res = await axios.post(
          baseURL + "/api/accounts/changepassword/",
          data 
        ); 

        if (res.status === 200) {
          setLoading(false);
          const mesg = {
            status: "success",
            title: 'password changed',
          };
          ToastStatusExample(mesg);
          navigate('/login')
      
          
        }
      } catch (error) {
        const mesg = { status: "error", title: "invalid email address" };
        ToastStatusExample(mesg);
        setLoading(false);
      }
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
    <Container maxW="7xl" p={{ base: 5, md: 10 }}>
      <Center>
        <Stack spacing={4}>
          <Stack align="center">
            <Heading fontSize="2xl">Change password</Heading>
          </Stack>
          <VStack
            as="form"
            boxSize={{ base: "xs", sm: "sm", md: "md" }}
            h="max-content !important"
            bg={useColorModeValue("white", "gray.700")}
            rounded="lg"
            boxShadow="lg"
            p={{ base: 5, sm: 10 }}
            spacing={8}
          >
            <VStack spacing={4} w="100%">
              <FormControl id="email">
                <FormLabel>New Password</FormLabel>
                <Input
                  rounded="md"
                  type="password"
                  onChange={(event) => setNewPass(event.target.value)}
                />
              </FormControl>
              <FormControl id="password">
                <FormLabel>Confirm new password</FormLabel>
                <InputGroup size="md">
                  <Input
                    rounded="md"
                    type={show ? "text" : "password"}
                    onChange={(event) => setConfPass(event.target.value)}
                  />
                  <InputRightElement width="4.5rem">
                    <Button
                      h="1.75rem"
                      size="sm"
                      rounded="md"
                      bg={useColorModeValue("gray.300", "gray.700")}
                      _hover={{
                        bg: useColorModeValue("gray.400", "gray.800"),
                      }}
                      onClick={handleClick}
                    >
                      {show ? "Hide" : "Show"}
                    </Button>
                  </InputRightElement>
                </InputGroup>
              </FormControl>
            </VStack>
            <VStack w="100%">
              <Button
                bg="green.300"
                color="white"
                _hover={{
                  bg: "green.500",
                }}
                rounded="md"
                w="100%"
                onClick={HandlePassword}
              >
                Change password
              </Button>
            </VStack>
          </VStack>
        </Stack>
      </Center>
    </Container>
  );
};

export default ChangePassword;
