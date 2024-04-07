// ProductList.js
import React from 'react';
// import { useProductsState, useCartState, useSearchState } from './useAppState';
import { useProductsState, useCartState, useSearchState } from './useAppState';

import Cart from './Cart'; // Import the Cart component

const ProductList = () => {
  const { products } = useProductsState();
  const { cart, addToCart } = useCartState();
  const { searchTerm, setSearchTerm } = useSearchState();

  const filteredProducts = products.filter(product =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  return (
    <div>
      <h2>Product List</h2>
      <input type="text" placeholder="Search products..." value={searchTerm} onChange={handleSearch} />
      <div>
        {filteredProducts.map(product => (
          <div key={product.id}>
            <img src={product.image} alt={product.name} />
            <h3>{product.name}</h3>
            <p>${product.price}</p>
            <button onClick={() => addToCart(product)}>Add to Cart</button>
          </div>
        ))}
      </div>
      
      {/* Pass cart state to Cart component */}
      <Cart />
    </div>
  );
};

export default ProductList;
