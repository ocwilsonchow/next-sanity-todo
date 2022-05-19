import { Flex, HStack, Text } from "@chakra-ui/react";
import React from "react";
import AboutModal from "./AboutModal";
import { ColorModeSwitcher } from "./ColorModeSwitcher";

const NavBar = () => {
  return (
    <Flex w="full" justifyContent="space-between" alignItems="center" p={6}>
      <Text fontWeight="black" fontSize="4xl">
        Tasks.
      </Text>
      <HStack>
        <AboutModal />
        <ColorModeSwitcher />
      </HStack>
    </Flex>
  );
};

export default NavBar;
