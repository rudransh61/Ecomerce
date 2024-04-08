import React from 'react';
import Header from '../Header/Header';

const ProductList = ({ products }) => {
  return (
    <>
    <Header/>
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-semibold mb-4">Product List</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {/* Render each product */}
        {products.map(product => (
          <div key={product.id} className="bg-white rounded-lg shadow-md p-4">
            <h2 className="text-lg font-semibold">{product.name}</h2>
            <p className="text-gray-600">Price: ${product.price}</p>
            <button className="mt-2 bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-md">Add to Cart</button>
          </div>
        ))}
      </div>
    </div>
    </>
    
  );
};

export default ProductList;
