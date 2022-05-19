import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  Button,
  Text,
  Box,
  Code,
  useColorModeValue,
} from "@chakra-ui/react";

const AboutModal = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const bgColor = useColorModeValue("rgba(255,255,255,0.8)", "rgba(0,0,0,0.5)");

  const packages = [
    {
      purpose: "Frontend",
      tech: "Next.js",
    },
    {
      purpose: "Backend",
      tech: "Sanity",
    },
    {
      purpose: "Data Fetching",
      tech: "SWR",
    },
    {
      purpose: "CSS Framework",
      tech: "Chakra UI",
    },
  ];

  return (
    <>
      <Button onClick={onOpen} variant="ghost" _focus={{ outline: 0 }}>
        About
      </Button>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent bg={bgColor} backdropFilter="blur(10px)" p={4}>
          <ModalCloseButton _focus={{ outline: 0 }} />
          <ModalBody m={10} pb={6}>
            {packages.map((a, i) => (
              <Box key={i} py={4}>
                <Code bg="none" fontSize="lg">
                  {a.purpose}
                </Code>
                <Text pl={0.5} fontWeight="extrabold" fontSize="3xl">
                  {a.tech}
                </Text>
              </Box>
            ))}
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};

export default AboutModal;
