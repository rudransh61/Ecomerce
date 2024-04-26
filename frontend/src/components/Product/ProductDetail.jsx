import React from 'react';
import { useParams } from 'react-router-dom';

const ProductDetails = ({ products }) => {
  const { id } = useParams(); // Get the id parameter from the URL

  // Find the product with the matching id
  const product = products.find(product => product.id === parseInt(id));

  // Check if the product exists
  if (!product) {
    return <div>Product not found</div>;
  }

  const { name, price, description, imageUrl } = product;

  const handlePayPalPayment = () => {
    // Prepare data for PayPal payment (e.g., item details, total amount)
    const data = {
      itemName: name,
      itemPrice: price,
      // You may add more details here, like quantity, currency, etc.
    };

    // Send data to your backend to initiate the PayPal payment process
    fetch('http://localhost:3000/create-paypal-payment', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
      .then(response => response.json())
      .then(payment => {
        // Redirect the user to PayPal's checkout page
        window.location.href = payment.redirectUrl;
      })
      .catch(error => {
        console.error('Error initiating PayPal payment:', error);
        // Handle error
      });
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-4">
      <img src={imageUrl} alt={name} className="w-full h-48 object-cover mb-4" />
      <h2 className="text-lg font-semibold ">{name}</h2>
      <p className="text-gray-600 mb-2">Price: ${price}</p>
      <p className="text-gray-700 mb-4">{description}</p>
      <button
        onClick={handlePayPalPayment}
        className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-md"
      >
        Buy with PayPal
      </button>
    </div>
  );
};

export default ProductDetails;
