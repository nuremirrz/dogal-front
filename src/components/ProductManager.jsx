import React, { useState, useEffect } from 'react';
import { Box, Button, FormControl, FormLabel, Heading, Input, VStack, Table, Thead, Tbody, Tr, Th, Td } from '@chakra-ui/react';
import { FaEdit, FaTrash } from 'react-icons/fa';
import axios from 'axios';

const ProductManager = () => {
  const [products, setProducts] = useState([]);
  const [product, setProduct] = useState({ name: "", description: "", price: "", image: "" });

  // Получение продуктов
  useEffect(() => {
    const fetchProducts = async () => {
      const response = await axios.get('/api/products');
      setProducts(response.data);
    };
    fetchProducts();
  }, []);

  // Обработка изменения полей
  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduct({ ...product, [name]: value });
  };

  // Обработка добавления продукта
  const handleSubmit = async (e) => {
    e.preventDefault();
    await axios.post('/api/products', product);
    setProduct({ name: "", description: "", price: "", image: "" });
    // Перезагрузка списка продуктов
  };

  return (
    <div>
      <Box mb={10}>
        <Heading as="h2" size="lg" mb={4}>Управление продуктами</Heading>
        <form onSubmit={handleSubmit}>
          <VStack spacing={4}>
            <FormControl>
              <FormLabel htmlFor="name">Название</FormLabel>
              <Input id="name" name="name" value={product.name} onChange={handleChange} required />
            </FormControl>
            <FormControl>
              <FormLabel htmlFor="description">Описание</FormLabel>
              <Input id="description" name="description" value={product.description} onChange={handleChange} required />
            </FormControl>
            <FormControl>
              <FormLabel htmlFor="price">Цена</FormLabel>
              <Input id="price" name="price" type="number" value={product.price} onChange={handleChange} required />
            </FormControl>
            <FormControl>
              <FormLabel htmlFor="image">Изображение</FormLabel>
              <Input id="image" name="image" value={product.image} onChange={handleChange} />
            </FormControl>
            <Button type="submit" colorScheme="teal">Добавить продукт</Button>
          </VStack>
        </form>
        
        {/* Таблица продуктов */}
        <Table mt={5}>
          <Thead>
            <Tr>
              <Th>Название</Th>
              <Th>Описание</Th>
              <Th>Цена</Th>
              <Th>Изображение</Th>
              <Th>Редактировать</Th>
              <Th>Удалить</Th>
            </Tr>
          </Thead>
          <Tbody>
            {products.map((prod) => (
              <Tr key={prod._id}>
                <Td>{prod.name}</Td>
                <Td>{prod.description}</Td>
                <Td>{prod.price}</Td>
                <Td>{prod.image}</Td>
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

export default ProductManager;
