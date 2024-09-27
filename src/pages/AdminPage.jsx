// AdminPage.jsx
import React, { useState } from 'react';
import Sidebar from '../components/Sidebar';
import ProductManager from '../components/ProductManager';
import EmployeeManager from '../components/EmployeeManager';
import { Box, Flex } from '@chakra-ui/react';

const AdminPage = () => {
    const [selectedSection, setSelectedSection] = useState('products');

    return (
        <Flex height="100vh">
            {/* Sidebar */}
            <Sidebar onSelect={setSelectedSection} />

            {/* Main Content Area */}
            <Box
                flex="1"
                marginLeft={{ base: 0, md: '250px' }}
                padding="1rem"
                overflowY="auto"
            >
                {selectedSection === 'products' && <ProductManager />}
                {selectedSection === 'employees' && <EmployeeManager />}
            </Box>
        </Flex>
    );
};

export default AdminPage;
