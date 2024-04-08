import React, { useState } from 'react';
import Cart from './components/Cart/Cart';
import ProductList from './components/Product/Product';
import NoPage from './components/Page/NoPage';
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
          <Route path="/" element={<ProductList products={cartItems} />}>
            <Route path="/cart" element={<Cart cartItems={cartItems} />} />
            <Route path="*" element={<NoPage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
