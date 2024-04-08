import React from 'react';

const Cart = ({ cartItems }) => {
  // Calculate total price
  const totalPrice = cartItems.reduce((total, item) => total + item.price, 0);

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-semibold mb-4">Shopping Cart</h1>
      {cartItems.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <div>
          <ul>
            {/* Render each cart item */}
            {cartItems.map(item => (
              <li key={item.id}>
                <div>{item.name}</div>
                <div>Price: ${item.price}</div>
              </li>
            ))}
          </ul>
          <div className="mt-4">
            Total Price: ${totalPrice.toFixed(2)}
          </div>
          <button className="mt-4 bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-md">
            Checkout
          </button>
        </div>
      )}
    </div>
  );
};

export default Cart;
