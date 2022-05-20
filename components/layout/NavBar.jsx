import {
  Button,
  Flex,
  HStack,
  IconButton,
  useColorModeValue,
} from "@chakra-ui/react";
import Link from "next/link";
import AboutModal from "./AboutModal";
import { ColorModeSwitcher } from "./ColorModeSwitcher";
import { BsGithub } from "react-icons/bs";

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
        <Button
          variant="link"
          color={txtColor}
          _focus={{ outline: 0 }}
          fontWeight="black"
          fontSize="4xl"
        >
          Tasks.
        </Button>
      </Link>
      <HStack>
        <a
          href="https://github.com/ocwilsonchow/next-sanity-todo"
          target="_blank"
          rel="noreferrer"
        >
          <IconButton
            icon={<BsGithub />}
            variant="ghost"
            _focus={{ outline: 0 }}
          />
        </a>
        <AboutModal />
        <ColorModeSwitcher />
      </HStack>
    </Flex>
  );
};

export default NavBar;
