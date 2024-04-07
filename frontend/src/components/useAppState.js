// useAppState.jsx
import { useState } from 'react';

const useProductsState = () => {
  const [products, setProducts] = useState([
    { id: 1, name: 'Product 1', price: 10, image: 'product1.jpg' },
    { id: 2, name: 'Product 2', price: 20, image: 'product2.jpg' },
    { id: 3, name: 'Product 3', price: 30, image: 'product3.jpg' }
  ]);

  return { products, setProducts };
};

const useCartState = () => {
  const [cart, setCart] = useState([]);

  const addToCart = (product) => {
    setCart([...cart, product]);
  };

  return { cart, addToCart };
};
const useSearchState = () => {
  const [searchTerm, setSearchTerm] = useState('');

  return { searchTerm, setSearchTerm };
};

export { useProductsState, useCartState, useSearchState } ;