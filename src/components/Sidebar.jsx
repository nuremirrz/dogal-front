// Sidebar.jsx
import React from 'react';
import { Box, VStack, Button } from '@chakra-ui/react';

const Sidebar = ({ onSelect }) => {
    return (
        <Box
            as="nav"
            width={{ base: '100%', md: '150px' }}
            height="100vh"
            bg="green.200"
            color="white"
            position={{ base: 'relative', md: 'fixed' }}
            display="flex"
            flexDirection="column"
            alignItems="center"
            paddingTop="1rem"
        >
            <VStack spacing={4}>
                <Button
                    width="100%"
                    color='black'
                    onClick={() => onSelect('products')}
                >
                    Products
                </Button>
                <Button                    
                    width="100%"
                    onClick={() => onSelect('employees')}
                >
                    Employees
                </Button>
            </VStack>
        </Box>
    );
};

export default Sidebar;
