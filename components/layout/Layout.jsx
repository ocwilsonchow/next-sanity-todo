import { Box, Flex } from "@chakra-ui/react";
import React from "react";
import NavBar from "./NavBar";

const Layout = ({ children }) => {
  return (
    <Flex justifyContent="center" h="100vh">
      <Box w="full" maxW={1200}>
        <Flex w="full">
          <NavBar />
        </Flex>
        <Box w="full">{children}</Box>
      </Box>
    </Flex>
  );
};

export default Layout;
