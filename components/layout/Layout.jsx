import { Box, Center, Flex, VStack } from "@chakra-ui/react";
import React from "react";
import NavBar from "./NavBar";

const Layout = ({ children }) => {
  return (
    <Flex justifyContent="center" h="100vh" position="relative">
      <VStack w="full">
        <Flex w="full" position="sticky" justifyContent='center' top={0} zIndex={2} backdropFilter="blur(5px)">
          <NavBar />
        </Flex>
        <Box w="full" maxW={1200} zIndex={0}>
          {children}
        </Box>
      </VStack>
    </Flex>
  );
};

export default Layout;
