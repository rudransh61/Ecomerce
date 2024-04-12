import React, { useEffect, useState } from 'react';
import Header from '../Header/Header';
import { jwtDecode } from 'jwt-decode'; // Import jwt-decode library
import "core-js/stable/atob"

const ProductList = ({ products }) => {
  const [email, setEmail] = useState('');

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      console.log(token)
      // Decode the token to extract the email
      const decodedToken = jwtDecode(token,{header:true});
      console.log(decodedToken)
      const userEmail = decodedToken.email;
      setEmail(userEmail);
    } else {
      // Redirect to login if token is not present
      window.location.href = '/login';
    }
  }, []); // Empty dependency array ensures this effect runs only once on mount

  return (
    <>
      <Header />
      <div className="container mx-auto py-8">
        {/* Print the email as a heading */}
        <h1 className="text-3xl font-bold mb-4">Hi! {email}</h1>
        <h1 className="text-3xl font-semibold mb-4">Product List</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
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
