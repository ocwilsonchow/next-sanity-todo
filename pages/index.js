import { Box, Grid, Center, Spinner } from "@chakra-ui/react";
import CreateTask from "../components/task/CreateTask";
import SingleTask from "../components/task/SingleTask";
import { client } from "../lib/sanity";
import useSWR from "swr";
import groq from 'groq'

const fetcher = (query) => client.fetch(query).then((r) => r);
const key = groq`*[_type == "task"] | order(_createdAt desc)`

export default function Home() {
  const { data: tasks, error, mutate } = useSWR(key, fetcher);

  if (!tasks)
    return (
      <Center>
        <Spinner />
      </Center>
    );

  return (
    <Box p={4}>
      <Grid templateColumns="repeat(6, 1fr)" gap={4}>
        <CreateTask />
        {tasks.map((task) => (
          <SingleTask task={task} key={task._id} />
        ))}
      </Grid>
    </Box>
  );
}
