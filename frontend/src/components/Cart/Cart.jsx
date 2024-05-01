import React, { useEffect, useState } from 'react';
import { jwtDecode } from 'jwt-decode'; // Import jwt-decode library
// import Link  from 'react';
import { Link } from 'react-router-dom';


const Cart = ({ products =[] }) => {
  // console.log(product)
  const [cartItems, setCartItems] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      const decodedToken = jwtDecode(token);
      const userEmail = decodedToken.email;
      fetchCartItems(userEmail);
    } else {
      // Redirect to login if token is not present
      window.location.href = '/login';
    }
  }, []);

  const fetchCartItems = async (email) => {
    try {
      const response = await fetch(`http://localhost:3000/get-cart-items?email=${email}`, {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      if (response.ok) {
        const data = await response.json();
        setCartItems(data.cartItems);
        calculateTotalPrice(data.cartItems);
        console.log(data.cartItems)
      } else {
        console.error('Error fetching cart items:', response.statusText);
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const calculateTotalPrice = (items) => {
    const total = items.reduce((acc, item) => acc + item.price, 0);
    setTotalPrice(total);
  };

  function findProductIdByName(productName) {
    for (let i = 0; i < products.length; i++) {
      if (products[i].name === productName) {
          return products[i].id;
      }
  }
  return null; 
}

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-semibold mb-4">Shopping Cart</h1>
      {cartItems.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <div>
          <ul>
            {cartItems.map(item => {
              // Find the product with the same name as the current item
              // let product;
              // for (let i = 0; i < products?.length; i++) {
              //   if (products[i].name === item.name) {
              //     product = products[i];
              //     break;
              //   }
              // }


              // Check if a matching product is found
              // if (product) {
                return (
                  <li key={cartItems.indexOf(item) + 1}>
                    <div>{item.name}</div>
                    <div>Price: ${item.price}</div>
                    {/* Use the product's ID in the Link */}
                    <Link to={`/product/${products.find((name)=>{name==item.name})}`} className="mt-2 block text-blue-500">
                      Read More...
                    </Link>
                  </li>
                );
              // }

            })}
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
