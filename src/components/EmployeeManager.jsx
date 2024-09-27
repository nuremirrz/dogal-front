import React, { useState, useEffect } from 'react';
import { Box, Button, FormControl, FormLabel,Heading, Input, VStack, Table, Thead, Tbody, Tr, Th, Td } from '@chakra-ui/react';
import { FaEdit, FaTrash } from 'react-icons/fa';
import axios from 'axios';

const EmployeeManager = () => {
  const [employees, setEmployees] = useState([]);
  const [employee, setEmployee] = useState({ name: "", position: "", contact: "", image: "" });

  // Получение сотрудников
  useEffect(() => {
    const fetchEmployees = async () => {
      const response = await axios.get('/api/employees');
      setEmployees(response.data);
    };
    fetchEmployees();
  }, []);

  // Обработка изменения полей
  const handleChange = (e) => {
    const { name, value } = e.target;
    setEmployee({ ...employee, [name]: value });
  };

  // Обработка добавления сотрудника
  const handleSubmit = async (e) => {
    e.preventDefault();
    await axios.post('/api/employees', employee);
    setEmployee({ name: "", position: "", contact: "", image: "" });
    // Перезагрузка списка сотрудников
  };

  return (
    <div className="employee-manager">
      <Box mb={10}>
        <Heading as="h2" size="lg" mb={4}>Управление сотрудниками</Heading>
        <form onSubmit={handleSubmit}>
          <VStack spacing={4}>
            <FormControl>
              <FormLabel htmlFor="name">Имя</FormLabel>
              <Input id="name" name="name" value={employee.name} onChange={handleChange} required />
            </FormControl>
            <FormControl>
              <FormLabel htmlFor="position">Должность</FormLabel>
              <Input id="position" name="position" value={employee.position} onChange={handleChange} required />
            </FormControl>
            <FormControl>
              <FormLabel htmlFor="contact">Контакт</FormLabel>
              <Input id="contact" name="contact" value={employee.contact} onChange={handleChange} required />
            </FormControl>
            <FormControl>
              <FormLabel htmlFor="image">Изображение</FormLabel>
              <Input id="image" name="image" value={employee.image} onChange={handleChange} />
            </FormControl>
            <Button type="submit" colorScheme="teal">Добавить сотрудника</Button>
          </VStack>
        </form>

        {/* Таблица сотрудников */}
        <Table mt={5}>
          <Thead>
            <Tr>
              <Th>Имя</Th>
              <Th>Должность</Th>
              <Th>Контакт</Th>
              <Th>Изображение</Th>
              <Th>Редактировать</Th>
              <Th>Удалить</Th>
            </Tr>
          </Thead>
          <Tbody>
            {employees.map((emp) => (
              <Tr key={emp._id}>
                <Td>{emp.name}</Td>
                <Td>{emp.position}</Td>
                <Td>{emp.contact}</Td>
                <Td>{emp.image}</Td>
                <Td><Button ml='6'><FaEdit /></Button></Td>
                <Td><Button  ml='1'><FaTrash /></Button></Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </Box>
    </div>
  );
};

export default EmployeeManager;
