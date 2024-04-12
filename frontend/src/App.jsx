import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Cart from './components/Cart/Cart';
import ProductList from './components/Product/Product';
import NoPage from './components/Page/NoPage';
import LogIn from './components/Authentication/Login';
import SignIn from './components/Authentication/SignIn';

function App() {
  // State for total number of items
  const [totalItems, setTotalItems] = useState([]);

  // State for cart items
  const [cartItems, setCartItems] = useState([]);

  // State for token
  const [token, setToken] = useState('');

  useEffect(() => {
    const storedToken = localStorage.getItem('token');
    if (storedToken) {
      setToken(storedToken);
    }
  }, []);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={token ? <ProductList products={cartItems} /> : <LogIn setToken={setToken} />} />
        <Route path="/cart" element={<Cart cartItems={cartItems} />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/login" element={<LogIn setToken={setToken} />} />
        <Route path="*" element={<NoPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
