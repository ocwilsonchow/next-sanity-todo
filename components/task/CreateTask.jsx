import { useState } from "react";
import { GridItem, Flex, Input, Button, FormControl } from "@chakra-ui/react";
import { client } from "../../lib/sanity";
import groq from "groq";
import useSWR from "swr";

const fetcher = (query) => client.fetch(query).then((r) => r);
const key = groq`*[_type == "task"] | order(_createdAt desc)`;

const CreateTask = () => {
  const { data: tasks, error, mutate } = useSWR(key, fetcher);
  const [taskInput, setTaskInput] = useState("");
  const [loading, setLoading] = useState(false);

  const handleCreateTask = async (e) => {
    e.preventDefault();
    if (!taskInput) return;
    setLoading(true);
    const doc = {
      _type: "task",
      description: taskInput,
    };
    try {
      await client.create(doc);
      setTaskInput("");
      setLoading(false);
      // await mutate();
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
      p={3}
      borderWidth={0.5}
      rounded="base"
      colSpan={{ base: 6, sm: 6, md: 3, lg: 2 }}
    >
      <form style={{ width: "80%" }} onSubmit={(e) => handleCreateTask(e)}>
        <Input
          variant="flushed"
          w="full"
          placeholder="Create task"
          value={taskInput}
          onChange={(e) => setTaskInput(e.target.value)}
        />
      </form>
      <Button
        _focus={{ outline: 0 }}
        size="sm"
        onClick={(e) => handleCreateTask(e)}
        isLoading={loading}
        type="submit"
      >
        Create
      </Button>
    </GridItem>
  );
};

export default CreateTask;
