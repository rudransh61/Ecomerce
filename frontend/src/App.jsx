import React, { useState } from 'react';
import Cart from './components/Cart/Cart';
import ProductList from './components/Product/Product';
import NoPage from './components/Page/NoPage';
import LogIn from './components/Authentication/Login';
import SignIn from './components/Authentication/SignIn';
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  // State for total number of items
  const [totalItems, setTotalItems] = useState([]);
  
  // State for cart items
  const [cartItems, setCartItems] = useState([]);

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<ProductList products={cartItems} />}/>
          <Route path="/cart" element={<Cart cartItems={cartItems} />} />
          <Route path="/signin" element={<SignIn/>} />
          <Route path="/login" element={<LogIn/>} />
          <Route path="*" element={<NoPage />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
