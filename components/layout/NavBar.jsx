import { Flex, HStack, Text } from "@chakra-ui/react";
import React from "react";
import { ColorModeSwitcher } from "./ColorModeSwitcher";

const NavBar = () => {
  return (
    <Flex w="full" justifyContent="space-between" alignItems="center" p={6}>
      <Text fontWeight="black" fontSize="4xl">
        Tasks.
      </Text>
      <ColorModeSwitcher />
    </Flex>
  );
};

export default NavBar;
