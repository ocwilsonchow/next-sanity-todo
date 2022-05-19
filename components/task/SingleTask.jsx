import { useState, useEffect } from "react";
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
import moment from "moment";
import { client } from "../../lib/sanity";
import groq from "groq";
import useSWR from "swr";

const fetcher = (query) => client.fetch(query).then((r) => r);
const key = groq`*[_type == "task"] | order(_createdAt desc)`;

const SingleTask = ({ task }) => {
  const [loading, setLoading] = useState(false);
  const [checked, setChecked] = useState(task.done);
  const { data: tasks, error, mutate } = useSWR(key, fetcher);
  const bgColor = useColorModeValue("gray.50", "gray.900");
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
        position: 'bottom'
      });
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  useEffect(() => {
    setChecked(task.done);
  }, [task]);

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
    >
      <HStack>
        <Box>
          <Text fontSize="2xl" fontWeight="extrabold">
            {task.description}
          </Text>
          <Text fontSize="0.9rem" fontWeight="thin">
            {moment(task._createdAt).calendar()}
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
