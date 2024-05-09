import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Cart from './components/Cart/Cart';
import ProductList from './components/Product/Product';
import NoPage from './components/Page/NoPage';
import LogIn from './components/Authentication/Login';
import SignIn from './components/Authentication/SignIn';
import ProductDetails from './components/Product/ProductDetail'; // Import ProductDetails component


function App() {
  // State for token
  const [token, setToken] = useState('');

  useEffect(() => {
    const storedToken = localStorage.getItem('token');
    if (storedToken) {
      setToken(storedToken);
    }
  }, []);

  // Higher-order component for authentication
  const ProtectedRoute = ({ element, ...props }) => {
    const storedToken = localStorage.getItem('token');
    if (storedToken) {
      return element
    }
    return <Navigate to="/login" />;
  };

  // Define your product list
  const products = [
    { id: 1, name: "Shirt", price: 1, category: ["Cloths"] },
    { id: 2, name: "Car", price: 10, category: ["Vehicle"] },
    { id: 3, name: "Jeans", price: 4, category: ["Cloths", "Lower"] },
    { id: 4, name: "Dress", price: 5, category: ["Cloths"] },
    { id: 5, name: "Trousers", price: 7, category: ["Cloths", "Lower"] },
    { id: 6, name: "T-shirt", price: 3, category: ["Cloths", "Upper"] },
    { id: 7, name: "Sneakers", price: 8, category: ["Footwear"] },
    { id: 8, name: "Sandals", price: 6, category: ["Footwear"] },
    { id: 9, name: "Backpack", price: 12, category: ["Accessories"] },
    { id: 10, name: "Sunglasses", price: 9, category: ["Accessories"] },
    { id: 11, name: "Jacket", price: 15, category: ["Cloths", "Outerwear"] },
    { id: 12, name: "Skirt", price: 8, category: ["Cloths", "Lower"] },
    { id: 13, name: "Hoodie", price: 12, category: ["Cloths", "Upper"] },
    { id: 14, name: "Boots", price: 20, category: ["Footwear"] },
    { id: 15, name: "Watch", price: 25, category: ["Accessories"] },
    { id: 16, name: "Hat", price: 6, category: ["Accessories", "Headwear"] },
    { id: 17, name: "Gloves", price: 9, category: ["Accessories"] },
    { id: 18, name: "Sweater", price: 18, category: ["Cloths", "Upper"] },
    { id: 19, name: "Pants", price: 10, category: ["Cloths", "Lower"] },
    { id: 20, name: "Scarf", price: 7, category: ["Accessories"] }
  ];


  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<ProtectedRoute element={<ProductList products={products} />} />} />
        <Route path="/product/:id" element={<ProtectedRoute element={<ProductDetails products={products} />} />} /> {/* New route for product details */}
        <Route path="/cart" element={<ProtectedRoute element={<Cart products={products} />} />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/login" element={<LogIn setToken={setToken} />} />
        <Route path="*" element={<NoPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
