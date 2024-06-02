import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Box, Button, Grid, Select, Text } from "@chakra-ui/react";
import { Link } from 'react-router-dom';

const Home = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [sortOrder, setSortOrder] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('');

  useEffect(() => {
    axios.get('https://dbioz2ek0e.execute-api.ap-south-1.amazonaws.com/mockapi/get-products')
      .then(response => {
        setProducts(response.data.data);
        setFilteredProducts(response.data.data);
      })
      .catch(error => {
        console.error('Error fetching products:', error);
      });
  }, []);

  const handleSort = (event) => {
    const sortOrder = event.target.value;
    setSortOrder(sortOrder);
    let sortedProducts = [...filteredProducts];
    if (sortOrder === 'ascending') {
      sortedProducts.sort((a, b) => a.price - b.price);
    } else if (sortOrder === 'descending') {
      sortedProducts.sort((a, b) => b.price - a.price);
    }
    setFilteredProducts(sortedProducts);
  };

  const handleFilter = (event) => {
    const category = event.target.value;
    setCategoryFilter(category);
    if (category) {
      const filtered = products.filter(product => product.category === category);
      setFilteredProducts(filtered);
    } else {
      setFilteredProducts(products);
    }
  };

  return (
    <Box p={4}>
      <Box mb={4}>
        <Select placeholder="Sort by Price" onChange={handleSort}>
          <option value="ascending">Ascending</option>
          <option value="descending">Descending</option>
        </Select>
        <Select placeholder="Filter by Category" onChange={handleFilter} mt={2}>
          <option value="Men">Men</option>
          <option value="Women">Women</option>
          <option value="Kids">Kids</option>
          <option value="Home Decor">Home Decor</option>
        </Select>
      </Box>
      <Grid templateColumns={{ sm: 'repeat(1, 1fr)', md: 'repeat(2, 1fr)', lg: 'repeat(3, 1fr)' }} gap={6}>
        {filteredProducts.map(product => (
          <Box key={product.id} borderWidth="1px" borderRadius="lg" overflow="hidden" p={4}>
            <Text fontWeight="bold" fontSize="xl">{product.name}</Text>
            <Text>{product.category}</Text>
            <Text>${product.price}</Text>
            <Button mt={2} colorScheme="teal">
              <Link to={`/product`}>More Details</Link>
            </Button>
          </Box>
        ))}
      </Grid>
    </Box>
  );
};

export default Home;
