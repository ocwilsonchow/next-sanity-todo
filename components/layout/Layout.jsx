import { Box, Flex } from "@chakra-ui/react";
import React from "react";
import NavBar from "./NavBar";

const Layout = ({ children }) => {
  return (
    <Flex justifyContent="center" h="100vh" position="relative">
      <Box w="full" maxW={1200}>
        <Flex w="full" position="sticky" top={0} zIndex={2}>
          <NavBar />
        </Flex>
        <Box w="full" zIndex={0}>
          {children}
        </Box>
      </Box>
    </Flex>
  );
};

export default Layout;
