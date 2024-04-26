import React, { useEffect, useState } from 'react';
import Header from '../Header/Header';
import { jwtDecode } from 'jwt-decode'; // Import jwt-decode library
import { Link } from 'react-router-dom';

const ProductList = ({ products }) => {
  const [email, setEmail] = useState('');
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [filter, setFilter] = useState({ name: '', minPrice: '', maxPrice: '' });

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      const decodedToken = jwtDecode(token);
      const userEmail = decodedToken.email;
      setEmail(userEmail);
    } else {
      // Redirect to login if token is not present
      window.location.href = '/login';
    }
    // Set filtered products initially to all products
    setFilteredProducts(products);
  }, [products]);

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilter({ ...filter, [name]: value });
  };

  useEffect(() => {
    // Filter products based on filter criteria
    const filtered = products.filter(product => {
      const nameMatch = product.name.toLowerCase().includes(filter.name.toLowerCase());
      const minPriceMatch = filter.minPrice === '' || product.price >= parseFloat(filter.minPrice);
      const maxPriceMatch = filter.maxPrice === '' || product.price <= parseFloat(filter.maxPrice);
      return nameMatch && minPriceMatch && maxPriceMatch;
    });
    setFilteredProducts(filtered);
  }, [filter, products]);
  const addToCart = async (productName, productPrice, email) => {
    try {
      const token = localStorage.getItem('token');
      const url = `http://localhost:3000/add-to-cart/${encodeURIComponent(email)}/${encodeURIComponent(productName)}/${encodeURIComponent(productPrice)}`;
      
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      });
  
      const data = await response.json();
      console.log(data.message); // Log success message or handle response accordingly
    } catch (error) {
      console.error('Error:', error);
      // Handle error
    }
  };
  
  

  return (
    <>
      <Header />
      <div className="container mx-auto py-8">
        <h1 className="text-3xl font-bold mb-4">Hi! {email}</h1>
        <h1 className="text-3xl font-semibold mb-4">Product List</h1>
        {/* Filter form */}
        <form className="mb-4">
          <input
            type="text"
            name="name"
            value={filter.name}
            onChange={handleFilterChange}
            placeholder="Search by name"
            className="mr-2 p-2"
          />
          <input
            type="number"
            name="minPrice"
            value={filter.minPrice}
            onChange={handleFilterChange}
            placeholder="Min price"
            className="mr-2 p-2"
          />
          <input
            type="number"
            name="maxPrice"
            value={filter.maxPrice}
            onChange={handleFilterChange}
            placeholder="Max price"
            className="mr-2 p-2"
          />
        </form>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredProducts.map(product => (
            <div key={product.id} className="bg-white rounded-lg shadow-md p-4">
              <h2 className="text-lg font-semibold ">{product.name}</h2>
              <p className="text-gray-600">Price: ${product.price}</p>
              <button
                onClick={() => addToCart(product.name, product.price, email)}
                className="mt-2 bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-md"
              >
                Add to Cart
              </button>
              <Link to={`/product/${product.id}`} className="mt-2 block text-blue-500">Read More...</Link>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default ProductList;
