import { GridItem, HStack, Checkbox, Text, Flex, Input } from "@chakra-ui/react";

const CreateTask = () => {
  return (
    <GridItem
      as={Flex}
      justifyContent="space-between"
      p={3}
      borderWidth={1}
      rounded="base"
      colSpan={{ base: 6, sm: 3, md: 2, lg: 2 }}
    >
      <HStack spacing={3}>
        <Checkbox />
        <Input variant='flushed' />
      </HStack>
    </GridItem>
  );
};

export default CreateTask;
