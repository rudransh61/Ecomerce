// ProductList.js

import React, { useEffect, useState } from 'react';
import Header from '../Header/Header';
import { jwtDecode } from 'jwt-decode'; // Import jwt-decode library
import { Link } from 'react-router-dom';

const ProductList = ({ products }) => {
  const [email, setEmail] = useState('');
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [filter, setFilter] = useState({ name: '', minPrice: '', maxPrice: '', category: '' });
  const [cartItems, setCartItems] = useState([]);
  const [recommendations, setRecommendations] = useState([]);

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
        // calculateTotalPrice(data.cartItems);
        // console.log("Cart: ",data.cartItems)
        generateRecommendations(data.cartItems)
      } else {
        console.error('Error fetching cart items:', response.statusText);
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };


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

  // const generateRecommendations = (cartItems) => {
  //   // console.log(cartItems)
  //   const listofitems = Object.values(cartItems);

  //   // console.log(listofitems)
  //   // Get categories of items in the cart
  //   //   const categories = Array.from(new Set(listofitems.map(item => item.name)));

  //   // // Filter products based on matching categories
  //   // const recommendedProducts = products.filter(product =>
  //   //   categories.some(cate => product.category.includes(cate))
  //   // );
  //   let finalList = [];
  //   let categoryList = [];
  //   listofitems.map(item => {
  //     products.map(prod => {
  //       if (prod.name == item.name) {
  //         // categorylist = prod.category
  //         // 
  //         categoryList.push(...prod.category)
  //       }
  //       // console.log(prod)
  //     })
  //   })
  //   // categoryList.filter((item,
  //   //   index) => categoryList.indexOf(item) === index);
  //   categoryList = [...new Set(categoryList)]
  //   // console.log(categoryList)

  //   products.map(product => {
      
  //   })

  //   listofitems.map(item => {
  //     // Find the product with the same name as the current item
  //     // let categorylist = []
  //     // console.log("Products",products)
  //     var IsInCart = false
  //     products.map(prod => {
  //       if (prod.name == item.name) {
  //         // categorylist = prod.category
  //         IsInCart = true
  //       }
  //       // console.log(prod)
  //     })

  //     if(!IsInCart){
  //       // if()
  //       finalList.push(item)
  //     }
  //     // console.log("Item:",item)
  //     console.log(IsInCart)
  //   })

  //   setRecommendations(finalList);
  //   // console.log(finalList)
  // };

  const generateRecommendations = (cartItems) => {
    const listofitems = Object.values(cartItems);
    let finalList = [];
    let categoryList = [];
  
    // Extract categories of items in the cart
    listofitems.forEach(item => {
      const product = products.find(prod => prod.name === item.name);
      if (product) {
        categoryList.push(...product.category);
      }
    });
  
    // Filter out duplicate categories
    categoryList = [...new Set(categoryList)];
  
    // Find products with categories in the category list but not in the cart
    products.forEach(product => {
      const isInCart = listofitems.some(item => item.name === product.name);
      if (!isInCart && product.category.some(cat => categoryList.includes(cat))) {
        finalList.push(product);
      }
    });
  
    setRecommendations(finalList);
  };
  useEffect(() => {
    // Filter products based on filter criteria
    const filtered = products.filter(product => {
      const nameMatch = product.name.toLowerCase().includes(filter.name.toLowerCase());
      const categoryMatch = product.category.some(c =>
        c.toLowerCase().includes(filter.category.toLowerCase())
      );
      const minPriceMatch = filter.minPrice === '' || product.price >= parseFloat(filter.minPrice);
      const maxPriceMatch = filter.maxPrice === '' || product.price <= parseFloat(filter.maxPrice);
      return nameMatch && categoryMatch && minPriceMatch && maxPriceMatch;
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
          <input
            type="text"
            name="category"
            value={filter.category}
            onChange={handleFilterChange}
            placeholder="Search by category"
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
              <p>Categories :
                {product.category.map(c => (
                  <span key={c} className="bg-gray-200 px-2 py-1 rounded-md mr-2">{c}</span>
                ))}
              </p>
            </div>
          ))}
        </div>
      </div>
      <div className="container mx-auto py-8">
        <h2 className="text-3xl font-semibold mb-4">Recommendations</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {recommendations.map(product => (
            <div key={product.id} className="bg-white rounded-lg shadow-md p-4">
              <h2 className="text-lg font-semibold">{product.name}</h2>
              <p className="text-gray-600">Price: ${product.price}</p>
              <Link to={`/product/${product.id}`} className="mt-2 block text-blue-500">Read More...</Link>
              <button
                onClick={() => addToCart(product.name, product.price, email)}
                className="mt-2 bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-md"
              >
                Add to Cart
              </button>
              <p>Categories:
                {product.category.map(c => (
                  <span key={c} className="bg-gray-200 px-2 py-1 rounded-md mr-2">{c}</span>
                ))}
              </p>
            </div>
          ))}
        </div>
      </div>

    </>
  );
};

export default ProductList;
