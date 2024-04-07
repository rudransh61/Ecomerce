// Cart.js
import React from 'react';
import { useCartState } from './useAppState';

const Cart = () => {
  const { cart } = useCartState();

  return (
    <div>
      <h2>Shopping Cart</h2>
      <div>
        {cart.map(item => (
          <div key={item.id}>
            <p>{item.name} - ${item.price}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Cart;
