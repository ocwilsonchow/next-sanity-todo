import { useState } from "react";
import {
  Text,
  Flex,
  GridItem,
  Button,
  useColorModeValue,
  useToast,
  HStack,
} from "@chakra-ui/react";
import { client } from "../../lib/sanity";
import { useRouter } from "next/router";
import useSWR from "swr";
import groq from "groq";
import { deletePointSuccessToast } from "../../helpers/toast/deletePointSuccess";

const fetcher = (query) => client.fetch(query).then((r) => r[0]);

const SinglePoint = ({ point, i }) => {
  const router = useRouter();
  const { id } = router.query;
  const [loading, setLoading] = useState(false);
  const bgColor = useColorModeValue("gray.50", "teal.800");
  const toast = useToast();
  const key = groq`*[_type == "task" && _id == "${id}" ]`;
  const { data: task, mutate } = useSWR(key, fetcher);

  // Normal Delete, only mutate when delete is successful
  const handleDelete = async (i) => {
    setLoading(true);
    try {
      const pointToRemove = [`details[${i}]`];
      await client.patch(task._id).unset(pointToRemove).commit();
      await mutate();
      toast(deletePointSuccessToast);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  // SWR optimistic update, will remove the item instantly even if the server fails. If it fails, SWR will rollback to original data
  const handleOptimisticDelete = async (i) => {
    try {
      const pointToRemove = [`details[${i}]`];
      const optimisticDetails = task.details.filter((a, index) => index !== i);
      const optimisticTask = { ...task, details: optimisticDetails };
      const options = { optimisticData: optimisticTask, rollbackOnError: true };
      await mutate(
        client.patch(task._id).unset(pointToRemove).commit(),
        options
      );
      toast(deletePointSuccessToast);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <GridItem
      px={4}
      py={3}
      borderWidth={0.5}
      rounded="base"
      as={Flex}
      justifyContent="space-between"
      alignItems="center"
      colSpan={{ base: 4, sm: 4, md: 4, lg: 4 }}
      gap={8}
      bg={bgColor}
    >
      <Flex>
        <Text fontSize="2xl" fontWeight="bold" lineHeight={1.1}>
          {point}
        </Text>
      </Flex>
      <HStack>
        <Button
          isLoading={loading}
          _focus={{ outline: 0 }}
          onClick={() => handleOptimisticDelete(i)}
          size="sm"
          variant="outline"
        >
          Optimistic Delete
        </Button>
        <Button
          isLoading={loading}
          _focus={{ outline: 0 }}
          onClick={() => handleDelete(i)}
          size="sm"
          variant="outline"
        >
          Delete
        </Button>
      </HStack>
    </GridItem>
  );
};

export default SinglePoint;
