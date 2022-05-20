import { useState } from "react";
import {
  GridItem,
  Flex,
  Input,
  Button,
  useColorModeValue,
  useToast,
  FormControl,
} from "@chakra-ui/react";
import { client } from "../../lib/sanity";
import groq from "groq";
import useSWR from "swr";

const fetcher = (query) => client.fetch(query).then((r) => r);
const key = groq`*[_type == "task"] | order(_createdAt desc)`;

const CreateTask = () => {
  const { data, error, mutate } = useSWR(key, fetcher);
  const [taskInput, setTaskInput] = useState("");
  const [loading, setLoading] = useState(false);
  const bgColor = useColorModeValue("gray.50", "teal.800");
  const txtColor = useColorModeValue("black", "white");
  const toast = useToast();

  // Create task with Sanity Client
  const handleCreateTask = async (e) => {
    e.preventDefault();
    setTaskInput("");
    if (!taskInput) return;
    setLoading(true);
    const doc = {
      _type: "task",
      description: taskInput,
      highlighted: false
    };
    try {
      await client.create(doc);
      setLoading(false);
      await mutate();
      toast({
        title: "Task successfully created.",
        status: "success",
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
      columnGap={4}
      alignItems="center"
      px={4}
      py={3}
      borderWidth={0.5}
      rounded="base"
      colSpan={{ base: 6, sm: 6, md: 3, lg: 2 }}
      bg={bgColor}
      color={txtColor}
    >
      <form style={{ width: "80%" }} onSubmit={(e) => handleCreateTask(e)}>
        <FormControl>
          <Input
            variant="flushed"
            w="full"
            value={taskInput}
            onChange={(e) => setTaskInput(e.target.value)}
            fontSize="2xl"
            fontWeight="bold"
            focusBorderColor="teal.500"
          />
        </FormControl>
      </form>

      <Button
        _focus={{ outline: 0 }}
        size="sm"
        onClick={(e) => handleCreateTask(e)}
        isLoading={loading}
        type="submit"
        disabled={!taskInput}
      >
        Create
      </Button>
    </GridItem>
  );
};

export default CreateTask;
