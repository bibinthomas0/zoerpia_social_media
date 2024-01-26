import React from "react";
import {
  Avatar,
  Box,
  Flex,
  Icon,
  Text,
  Link,
  Button,
  VStack,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  useColorModeValue,
} from "@chakra-ui/react";

import {
  AiOutlineTeam,
  AiOutlineComment,
  AiOutlineBell,
  AiOutlinePhone,
  AiOutlineStar,
} from "react-icons/ai";

import { BsFolder2, BsCalendarCheck } from "react-icons/bs";
import { FiMenu } from "react-icons/fi";
import { RiFlashlightFill } from "react-icons/ri";
import SidebarComp from "./SidebarComp";

const Sidebar = () => {
  return (
    <VStack
      h="full"
      w="full"
      alignItems="flex-start"
      justifyContent="space-between"
    >
      <Box>
        <Flex px="4" py="5" align="center">
          <Icon as={RiFlashlightFill} h={8} w={8} />
          <Text
            fontSize="2xl"
            ml="2"
            color={useColorModeValue("brand.500", "white")}
            fontWeight="semibold"
          >
            ZORPIA
          </Text>
        </Flex>
        <Flex
          direction="column"
          as="nav"
          fontSize="md"
          color="gray.600"
          aria-label="Main Navigation"
        >
          <SidebarComp
            name={"Users"}
            icon={AiOutlineTeam}
            selected={true}
            navigation={"/admincontrol/users"}
          />
          <SidebarComp
            name={"Comment report"}
            icon={AiOutlineComment}
            selected={false}
            navigation={"/admincontrol/commentreports"}
          />
          <SidebarComp
            name={"Post report"}
            icon={FiMenu}
            selected={false}
            navigation={"/admincontrol/postreports"}
          />
          <SidebarComp
            name={"Chat Support"}
            icon={AiOutlinePhone}
            selected={false}
          />
        </Flex>
      </Box>

      <Flex px="4" py="5" mt={10} justifyContent="center" alignItems="center">
        <Menu>
          <MenuButton
            as={Button}
            size={"sm"}
            rounded={"full"}
            variant={"link"}
            cursor={"pointer"}
            _hover={{ textDecoration: "none" }}
          >
            <Avatar
              size={"sm"}
              name="Ahmad"
              src="https://avatars2.githubusercontent.com/u/37842853?v=4"
            />
          </MenuButton>
          <MenuList fontSize={17} zIndex={5555}>
            <MenuItem>Logout</MenuItem>
          </MenuList>
        </Menu>
      </Flex>
    </VStack>
  );
};

export default Sidebar;
