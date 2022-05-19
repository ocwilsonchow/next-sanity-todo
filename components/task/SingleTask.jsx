import { useState, useEffect } from "react";
import {
  Button,
  Switch,
  Box,
  Flex,
  GridItem,
  HStack,
  Text,
} from "@chakra-ui/react";
import moment from "moment";
import { client } from "../../lib/sanity";
import groq from "groq";
import useSWR from "swr";

const fetcher = (query) => client.fetch(query).then((r) => r);
const key = groq`*[_type == "task"] | order(_createdAt desc)`;

const SingleTask = ({ task }) => {
  const [loading, setLoading] = useState(false);
  const { data: tasks, error, mutate } = useSWR(key, fetcher);
  const [checked, setChecked] = useState(task.done);
  const [tasksMap, setTasksMap] = useState(tasks);

  // Handle delete the task
  const handleDelete = async () => {
    setLoading(true);
    try {
      await client.delete(task._id);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  useEffect(() => {
    setChecked(task.done);
  }, [task]);

  // handle update task done status
  const handleUpdate = async (e) => {
    const taskDoc = {
      _type: "task",
      _id: task._id,
      description: task.description,
      done: !checked,
    };

    const thisIndex = tasks.findIndex((a) => a._id === task._id);
    tasksMap[thisIndex] = taskDoc;
    const options = { optimisticData: tasksMap, rollbackOnError: true };

    // the function to be put in mutation
    const updateTask = async () => {
      await client
        .patch(task._id)
        .set({ done: !checked })
        .commit()
        .catch((err) => {
          console.error(err.message);
        });
      return tasksMap;
    };

    mutate(updateTask(), options);
  };

  return (
    <GridItem
      as={Flex}
      justifyContent="space-between"
      alignItems="center"
      p={3}
      borderWidth={0.5}
      rounded="base"
      colSpan={{ base: 6, sm: 6, md: 3, lg: 2 }}
    >
      <HStack spacing={4}>
        <Switch
          colorScheme="green"
          _focus={{ outline: 0 }}
          isChecked={checked}
          onChange={(e) => handleUpdate(e)}
        />
        <Box>
          <Text fontSize="lg" fontWeight="bold">
            {task.description}
          </Text>
          <Text fontSize="0.7rem" fontWeight="light">
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
