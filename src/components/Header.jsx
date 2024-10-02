import { Box, Text, Flex, Spacer, Button } from "@chakra-ui/react";

const Header = () => {
  return (
    <Box
      as="header"
      bg="gray.100"
      w="full"
      p="4"
      boxShadow="sm"
      position="fixed"
      zIndex="1"
      top="0"
      left={{ base: "0", md: "250px" }} // Adjust based on Sidebar width
      right="0"
    >
      <Flex alignItems="center">
        <Text fontSize="lg" fontWeight="bold">Dashboard Header</Text>
        <Spacer />
        <Button colorScheme="teal" size={{ base: "sm", md: "md" }}>Profile</Button>
      </Flex>
    </Box>
  );
};

export default Header;
