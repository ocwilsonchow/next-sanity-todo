import { Button, Flex, HStack, Text, useColorModeValue } from "@chakra-ui/react";
import Link from "next/link";
import React from "react";
import AboutModal from "./AboutModal";
import { ColorModeSwitcher } from "./ColorModeSwitcher";

const NavBar = () => {
    const txtColor = useColorModeValue("black", "white");




  return (
    <Flex
      w="full"
      justifyContent="space-between"
      alignItems="center"
      p={6}
      backdropFilter="blur(5px)"
    >
      <Link href="/">
        <Button variant='link' color={txtColor} _focus={{outline: 0 }}  fontWeight="black" fontSize="4xl">
          Tasks.
        </Button>
      </Link>
      <HStack>
        <AboutModal />
        <ColorModeSwitcher />
      </HStack>
    </Flex>
  );
};

export default NavBar;
