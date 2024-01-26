import { Fragment, useState,useEffect } from 'react';
import {
  Container,
  Flex,
  Stack,
  VStack,
  Icon,
  Divider,
  useColorModeValue,
  Avatar,
  Text,
  Box
} from '@chakra-ui/react';
// Here we have used react-icons package for the icon
import { BsDot } from 'react-icons/bs';


const NotifyComp = (props) => {

    

  return (
    <Box  padding={'5px'}>
      <VStack
      width={'500px'}
        boxShadow={useColorModeValue(
          '2px 6px 8px rgba(160, 174, 192, 0.6)',
          '2px 6px 8px rgba(9, 17, 28, 0.9)'
        )}
        
        rounded="md"
        overflow="hidden"
        spacing={0}
        bg={'blu'}
      >
       
          <> 
            <Flex
              w="100%"
              justifyContent="space-between"
              alignItems="center"
              _hover={{ bg: useColorModeValue('gray.200', 'gray.700') }}
              bg={'blue'}
            >
              <Stack spacing={0} direction="row" alignItems="center">
                <Flex p={4}>
                  {/* <Avatar size="md" name='Kent Dodds' src='https://bit.ly/kent-c-dodds' /> */}
                </Flex>
                <Flex direction="column" p={2}>
                  <Text
                    alignItems="start"
                    fontSize={{ base: 'sm', sm: 'md', md: 'md' }}
                   
                  >"{props.message}"</Text>
                  {/* <Text
                   
                    fontSize={{ base: 'sm', sm: 'md' }}
                  >
                    '4 days ago'
                  </Text> */}
                </Flex>
              </Stack>
              
                <Flex p={4}>
                  <Icon as={BsDot} w={10} h={10} color="blue.400" />
                </Flex>
            
            </Flex>
           
          </>
   
      </VStack>
    </Box>
  );
};

export default NotifyComp;