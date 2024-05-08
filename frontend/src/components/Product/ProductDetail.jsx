import React from 'react';
import { useParams } from 'react-router-dom';

const ProductDetails = ({ products }) => {
  const id  = useParams()['id']; // Get the id parameter from the URL
  console.log(id)
  // Find the product with the matching id
  // let product = products.find(product => product.id === parseInt(id));
  let product ;
  // console.log("Products",products)
  products.map(prod => {
    if (id == prod.id) {
      product = prod
    }
    // console.log(prod)
  })
  console.log(product)
  // Check if the product exists
  if (!product) {
    return <div>Product not found</div>;
  }

  const { name, price, description, category, imageUrl } = product;

  const handlePayPalPayment = () => {
    // Prepare data for PayPal payment (e.g., item details, total amount)
    const data = {
      itemName: name,
      itemPrice: price,
      // You may add more details here, like quantity, currency, etc.
    };

    // Send data to your backend to initiate the PayPal payment process
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-4">
      <h1>Product id : #{id}</h1>
      <img src={imageUrl} alt={name} className="w-full h-48 object-cover mb-4" />
      <h2 className="text-lg font-semibold ">{name}</h2>
      <p className="text-gray-600 mb-2">Price: ${price}</p>
      <p className="text-gray-700 mb-4">{description}</p>
      <button
        // onClick={handlePayPalPayment}
        className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-md"
      >
        Buy
      </button>
      <p>Categories :
        {category.map(c => (
          <span className="bg-gray-200 px-2 py-1 rounded-md mr-2">{c}</span>
        ))}
      </p>
    </div>
  );
};

export default ProductDetails;
