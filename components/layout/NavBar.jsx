import { Flex, HStack, Text } from "@chakra-ui/react";
import React from "react";

const NavBar = () => {
  return (
    <HStack p={4}>
      <Text fontWeight='black' fontSize='4xl'> Tasks.</Text>
    </HStack>
  );
};

export default NavBar;
