import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { Box, Button, Text, useToast, AlertDialog, AlertDialogBody, AlertDialogFooter, AlertDialogHeader, AlertDialogContent, AlertDialogOverlay, Spinner, Center } from "@chakra-ui/react";

const Product = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const toast = useToast();

  useEffect(() => {
    axios.get(`https://dbioz2ek0e.execute-api.ap-south-1.amazonaws.com/mockapi/get-products/${id}`)
      .then(response => {
        setProduct(response.data.data);
        setIsLoading(false);
      })
      .catch(error => {
        console.error('Error fetching product details:', error);
        setIsError(true);
        setIsLoading(false);
      });
  }, [id]);

  const handleAddToCart = () => {
    setIsDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setIsDialogOpen(false);
  };

  const handleConfirmAddToCart = () => {
    setIsDialogOpen(false);
    toast({
      title: "Item added to cart",
      status: "success",
      duration: 2000,
      isClosable: true,
    });
  };

  if (isLoading) {
    return (
      <Center h="100vh">
        <Spinner size="xl" />
      </Center>
    );
  }

  if (isError) {
    return (
      <Center h="100vh">
        <Text fontSize="xl" color="red.500">Error fetching product details. Please try again later.</Text>
      </Center>
    );
  }

  return (
    <Box p={4}>
      <Box borderWidth="1px" borderRadius="lg" overflow="hidden" p={4}>
        <Text fontWeight="bold" fontSize="2xl">{product.name}</Text>
        <Text>{product.category}</Text>
        <Text>${product.price}</Text>
        <Text mt={4}>{product.description}</Text>
        <Button mt={4} colorScheme="teal" onClick={handleAddToCart}>Add to Cart</Button>
      </Box>

      <AlertDialog isOpen={isDialogOpen} onClose={handleCloseDialog}>
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize="lg" fontWeight="bold">
              Add to Cart
            </AlertDialogHeader>
            <AlertDialogBody>
              Are you sure you want to add this item to cart?
            </AlertDialogBody>
            <AlertDialogFooter>
              <Button onClick={handleCloseDialog}>Cancel</Button>
              <Button colorScheme="teal" onClick={handleConfirmAddToCart} ml={3}>
                Confirm
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </Box>
  );
};

export default Product;
