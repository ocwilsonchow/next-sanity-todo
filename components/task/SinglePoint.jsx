import { useState } from "react";
import {
  Text,
  Flex,
  GridItem,
  Button,
  useColorModeValue,
} from "@chakra-ui/react";
import { StarIcon } from "@chakra-ui/icons";
import { client } from "../../lib/sanity";
import { useRouter } from "next/router";
import useSWR from "swr";
import groq from "groq";

const fetcher = (query) => client.fetch(query).then((r) => r[0]);

const SinglePoint = ({ point, i, taskId }) => {
  const router = useRouter();
  const { id } = router.query;
  const [loading, setLoading] = useState(false);
  const bgColor = useColorModeValue("gray.50", "teal.800");

  const key = groq`*[_type == "task" && _id == "${id}" ]`;
  const { mutate } = useSWR(key, fetcher);

  const handleDelete = async (i) => {
    setLoading(true);
    try {
      const pointToRemove = [`details[${i}]`];
      await client.patch(taskId).unset(pointToRemove).commit();
      await mutate();
      toast({
        title: "Task successfully deleted.",
        status: "info",
        duration: 2000,
        isClosable: true,
        position: "bottom",
      });
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  console.log(point)

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
      <Button
        isLoading={loading}
        _focus={{ outline: 0 }}
        onClick={() => handleDelete(i)}
        size="sm"
        variant="ghost"
      >
        Delete
      </Button>
    </GridItem>
  );
};

export default SinglePoint;
