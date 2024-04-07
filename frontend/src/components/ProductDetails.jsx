// ProductDetails.js
import React from 'react';
import { useParams } from 'react-router-dom';
import { useProductsState } from './useAppState';

const ProductDetails = () => {
  const { id } = useParams();
  const { products } = useProductsState();
  const product = products.find(product => product.id === parseInt(id));

  if (!product) {
    return <div>Product not found</div>;
  }

  return (
    <div>
      <h2>Product Details</h2>
      <div>
        <img src={product.image} alt={product.name} />
        <h3>{product.name}</h3>
        <p>${product.price}</p>
        <p>{product.description}</p>
      </div>
    </div>
  );
};

export default ProductDetails;
