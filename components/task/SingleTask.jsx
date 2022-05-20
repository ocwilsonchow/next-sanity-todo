import { useState } from "react";
import {
  Button,
  Box,
  Flex,
  GridItem,
  HStack,
  Text,
  useColorModeValue,
  useToast,
} from "@chakra-ui/react";
import { StarIcon } from "@chakra-ui/icons";
import moment from "moment";
import { client } from "../../lib/sanity";
import groq from "groq";
import useSWR from "swr";
import Link from "next/link";

const fetcher = (query) => client.fetch(query).then((r) => r);
const key = groq`*[_type == "task"] | order(_createdAt desc)`;

const SingleTask = ({ task }) => {
  const [loading, setLoading] = useState(false);
  const { data: tasks, error, mutate } = useSWR(key, fetcher);
  const bgColor = useColorModeValue("gray.50", "teal.800");
  const txtColor = useColorModeValue("black", "white");
  const toast = useToast();

  const handleDelete = async () => {
    setLoading(true);
    try {
      await client.delete(task._id);
      await mutate();
      toast({
        title: "Task successfully deleted.",
        status: "info",
        duration: 2000,
        isClosable: true,
        position: "bottom",
      });
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  return (
    <GridItem
      as={Flex}
      justifyContent="space-between"
      alignItems="center"
      p={4}
      borderWidth={0.5}
      rounded="base"
      colSpan={{ base: 6, sm: 6, md: 3, lg: 2 }}
      bg={bgColor}
      color={txtColor}
      position="relative"
    >
      <Flex mx={3} position="absolute" top={0} left={-3}>
        {task.highlighted && <StarIcon fontSize="xl" color="blue.400" />}
      </Flex>
      <HStack>
        <Box>
          <Link href={`/task/${task._id}`}>
            <Text
              fontSize="2xl"
              color={txtColor}
              fontWeight="extrabold"
              variant="link"
              _focus={{ outline: 0 }}
              noOfLines={1}
              cursor="pointer"
              _hover={{ opacity: 0.5 }}
            >
              {task.description}
            </Text>
          </Link>
          <Text fontSize="0.8rem" fontWeight="thin">
            {moment(task._updatedAt).calendar()}
          </Text>
        </Box>
      </HStack>
      <Button
        isLoading={loading}
        _focus={{ outline: 0 }}
        onClick={() => handleDelete()}
        size="sm"
        variant="ghost"
      >
        Delete
      </Button>
    </GridItem>
  );
};

export default SingleTask;
