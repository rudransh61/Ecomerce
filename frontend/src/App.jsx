import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Cart from './components/Cart/Cart';
import ProductList from './components/Product/Product';
import NoPage from './components/Page/NoPage';
import LogIn from './components/Authentication/Login';
import SignIn from './components/Authentication/SignIn';

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
    { id: 1, name: "Shirt", price: 1 },
    { id: 2, name: "Car", price: 10 },
    { id: 3, name: "Jeans", price: 4 }
  ];

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<ProtectedRoute element={<ProductList products={products} />} />} />
        <Route path="/cart" element={<ProtectedRoute element={<Cart />} />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/login" element={<LogIn setToken={setToken} />} />
        <Route path="*" element={<NoPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
