import { useState, useEffect } from "react";
import {
  Box,
  Center,
  Text,
  Spinner,
  FormControl,
  Input,
  useToast,
  Grid,
  Alert,
  AlertIcon,
  AlertTitle,
  InputGroup,
  InputRightElement,
  GridItem,
} from "@chakra-ui/react";
import { useRouter } from "next/router";
import { client } from "../../lib/sanity";
import useSWR from "swr";
import groq from "groq";
import SinglePoint from "../../components/task/SinglePoint";

const fetcher = (query) => client.fetch(query).then((r) => r[0]);

const PageTaskShow = () => {
  const router = useRouter();
  const { id } = router.query;
  const key = groq`*[_type == "task" && _id == "${id}" ]`;
  const [pointInput, setPointInput] = useState("");
  const [loading, setLoading] = useState(false);
  const toast = useToast();
  const { data: task, mutate } = useSWR(key, fetcher);
  const [errorMsg, setErrorMsg] = useState("");

  useEffect(() => {
    if (pointInput.length > 50) {
      setErrorMsg("Maximum 50 characters only.");
    } else {
      setErrorMsg("");
    }
  }, [pointInput]);

  const handleCreatePoint = async (e) => {
    e.preventDefault();
    if (!pointInput) return;
    if (errorMsg) return;
    setPointInput("");
    setLoading(true);

    try {
      await client
        .patch(id)
        .setIfMissing({ details: [] })
        .append("details", [pointInput])
        .commit({ autoGenerateArrayKeys: true });
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

  if (!task)
    return (
      <Center p={6}>
        <Spinner />
      </Center>
    );


  return (
    <Box p={6}>
      <Text fontWeight="extrabold" fontSize="7xl">
        {task.description}
      </Text>
      <Box py={6}>
        <form style={{ width: "100%" }} onSubmit={(e) => handleCreatePoint(e)}>
          <FormControl pl={1}>
            <InputGroup>
              <Input
                variant="flushed"
                w="full"
                placeholder="Create task"
                value={pointInput}
                onChange={(e) => setPointInput(e.target.value)}
                fontSize="2xl"
                fontWeight="extrabold"
                focusBorderColor="teal.500"
              />
              <InputRightElement bg="none" border="none">
                {loading && <Spinner />}
              </InputRightElement>
            </InputGroup>
            {errorMsg && (
              <Alert my={3}>
                <AlertIcon />
                <AlertTitle>{errorMsg}</AlertTitle>
              </Alert>
            )}
          </FormControl>
        </form>
      </Box>
      <Grid templateColumns="repeat(4, 1fr)" gap={4}>
        {!task.details && (
          <GridItem colSpan={6} as={Alert} colorScheme='gray' fontWeight="bold">
            <AlertTitle>{`Nothing in ${task.description}`}</AlertTitle>
          </GridItem>
        )}
        {task.details?.map((point, i) => (
          <SinglePoint key={i} point={point} i={i} task={task} />
        ))}
      </Grid>
    </Box>
  );
};

export default PageTaskShow;
