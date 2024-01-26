import React, { useState,useEffect } from "react";
import {
  Button,
  Flex,
  Icon,
  SimpleGrid,
  Stack,
  chakra,
  useColorModeValue,
} from "@chakra-ui/react";
import { AiFillEdit, AiTwotoneLock } from "react-icons/ai";
import axios from 'axios'

const baseURL = "http://127.0.0.1:8000";
const UserTable = () => {
    const baseURL = "http://127.0.0.1:8000";
    const [users, setUsers] = useState([]);
    const [nextPage, setNextPage] = useState(null);
    const [prevPage, setPrevPage] = useState(null);
    const [searchQuery, setSearchQuery] = useState("");


        const fetchUsers = (url) => {
            axios
              .get(url)
              .then((response) => {
                console.log(response.data.results)
                setUsers(response.data.results);
                setNextPage(response.data.next);
                setPrevPage(response.data.previous);
              })
              .catch((error) => {
                console.error("Error fetching users:", error);
              });
          };
        
          const handleSearch = (query) => {
            setSearchQuery(query);
            fetchUsers(`${baseURL}/api/accounts/listusers/?search=${query}`);
          };
        
          useEffect(() => {
            fetchUsers(baseURL + "/api/accounts/listusers/");
          }, []);
        
          useEffect(() => {
            fetchUsers(`${baseURL}/api/accounts/listusers/?search=${searchQuery}`);
          }, [searchQuery]);
    

      const bg = useColorModeValue("white", "gray.800");
      const bg2 = useColorModeValue("white", "gray.800");
      const bg3 = useColorModeValue("gray.100", "gray.700");



  return (
    <Flex
    w="full"
    bg="#edf3f8"
    _dark={{
      bg: "#3e3e3e",
    }}
    p={50}
    alignItems="center"
    justifyContent="center"
  >
    <Stack
      direction={{
        base: "column",
      }}
      w="full"
      bg={{
        md: bg,
      }}
      shadow="lg"
    >
        <SimpleGrid
              spacingY={3}
              columns={{
                base: 1,
                md: 4,
              }}
              w={{
                base: 120,
                md: "full",
              }}
              textTransform="uppercase"
              bg={bg3}
              color={"gray.500"}
              py={{
                base: 1,
                md: 4,
              }}
              px={{
                base: 2,
                md: 10,
              }}
              fontSize="md"
              fontWeight="bo;d"
            >
              <span>Name</span>
              <span>Created</span>
              <span>username</span>
              <span>View More</span>
              
            </SimpleGrid>
      {users.map((token) => {
        return (
          <Flex
            direction={{
              base: "row",
              md: "column",
            }}
            bg={bg2}
           
          >
            
            <SimpleGrid
              spacingY={3}
              columns={{
                base: 1,
                md: 4,
              }}
              w="full"
              py={2}
              px={10}
              marginTop={"1%"}
              marginBottom={"1%"}
              backgroundColor={"grey.100"}
              
            >
              <span>{token.name}</span>
              <span>
                {token.created_at}
              </span>
              <span>{token.username}</span>

              <Flex>
                <Button
                  size="sm"
                  variant="solid"
                  leftIcon={<Icon as={AiTwotoneLock} />}
                  colorScheme="purple"
                >
                  View Profile
                </Button>
              </Flex>
            </SimpleGrid>
          </Flex>
        );
      })}
    </Stack>
  </Flex>

  )
};

export default UserTable;
