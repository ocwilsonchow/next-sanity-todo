import { IconButton } from "@chakra-ui/button";
import { Checkbox } from "@chakra-ui/checkbox";
import { CloseButton } from "@chakra-ui/close-button";
import {
  Box,
  Center,
  Flex,
  Grid,
  GridItem,
  HStack,
  Text,
  VStack,
} from "@chakra-ui/layout";
import CreateTask from "../components/task/CreateTask";
import { apiGetAllTasks } from "../lib/task";

export default function Home({ tasks }) {
  console.log(tasks);
  return (
    <Box p={4}>
      <Grid mt={6} templateColumns="repeat(6, 1fr)" gap={4}>
        <CreateTask />
        {tasks.map((task) => (
          <GridItem
            key={task._id}
            as={Flex}
            justifyContent="space-between"
            alignItems='center'
            p={3}
            borderWidth={1}
            rounded="base"
            colSpan={{ base: 6, sm: 3, md: 2, lg: 2 }}
          >
            <HStack spacing={3} >
              <Checkbox />
              <Text>{task.description}</Text>
            </HStack>
            <CloseButton />
          </GridItem>
        ))}
      </Grid>
    </Box>
  );
}

export async function getStaticProps() {
  const tasks = await apiGetAllTasks();
  return {
    props: {
      tasks,
    },
  };
}
