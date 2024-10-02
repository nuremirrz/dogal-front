// src/components/Sidebar.jsx
import { Box, VStack, Text, Link, IconButton, Drawer, DrawerContent, useDisclosure } from "@chakra-ui/react";
import { HamburgerIcon } from "@chakra-ui/icons";
import { useState } from "react";

const Sidebar = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [display, changeDisplay] = useState('none');

  return (
    <>
      {/* Button for small screens */}
      <IconButton
        aria-label="Open Menu"
        icon={<HamburgerIcon />}
        size="lg"
        m="4"
        display={{ base: "block", md: "none" }}
        onClick={onOpen}
      />

      {/* Sidebar for larger screens */}
      <Box
        as="nav"
        bg="gray.800"
        color="white"
        w={{ base: "full", md: "250px" }}
        pos="fixed"
        h="full"
        p="4"
        display={{ base: "none", md: "block" }}
        zIndex="2"
      >
        <VStack spacing="4" align="stretch">
          <Text fontSize="lg" fontWeight="bold">Dashboard</Text>
          <Link href="#" _hover={{ textDecoration: 'none', bg: 'gray.700' }} p="2" borderRadius="md">Overview</Link>
          <Link href="#" _hover={{ textDecoration: 'none', bg: 'gray.700' }} p="2" borderRadius="md">Products</Link>
          <Link href="#" _hover={{ textDecoration: 'none', bg: 'gray.700' }} p="2" borderRadius="md">Employees</Link>
          <Link href="#" _hover={{ textDecoration: 'none', bg: 'gray.700' }} p="2" borderRadius="md">Settings</Link>
        </VStack>
      </Box>

      {/* Sidebar for small screens */}
      <Drawer placement="left" onClose={onClose} isOpen={isOpen}>
        <DrawerContent>
          <Box bg="gray.800" color="white" w="full" h="full" p="4">
            <VStack spacing="4" align="stretch">
              <Text fontSize="lg" fontWeight="bold">Dashboard</Text>
              <Link href="#" _hover={{ textDecoration: 'none', bg: 'gray.700' }} p="2" borderRadius="md" onClick={onClose}>Overview</Link>
              <Link href="#" _hover={{ textDecoration: 'none', bg: 'gray.700' }} p="2" borderRadius="md" onClick={onClose}>Products</Link>
              <Link href="#" _hover={{ textDecoration: 'none', bg: 'gray.700' }} p="2" borderRadius="md" onClick={onClose}>Employees</Link>
            </VStack>
          </Box>
        </DrawerContent>
      </Drawer>
    </>
  );
};

export default Sidebar;
