import React, { useState } from 'react';

const SignIn = () => {
  // State for email and password
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // Function to handle form submission
  // Assuming you are handling the sign-in form submission with handleSubmit function
const handleSubmit = async (e) => {
  e.preventDefault();
  
  try {
    // Send sign-in request to backend
    const response = await fetch('http://localhost:3000/signin', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    });
    const data = await response.json();
    console.log(data); // Log response from backend (token and redirect URL)

    // Perform the redirect using client-side routing
    window.location.href = data.redirectUrl;
  } catch (error) {
    console.error('Error:', error);
  }
};


  return (
    <div className="container mx-auto max-w-md mt-20">
      <h1 className="text-3xl font-semibold mb-4">Sign In</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
          <input type="email" id="email" name="email" value={email} onChange={(e) => setEmail(e.target.value)} className="mt-1 focus:ring-blue-500 focus:border-blue-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md" />
        </div>
        <div>
          <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
          <input type="password" id="password" name="password" value={password} onChange={(e) => setPassword(e.target.value)} className="mt-1 focus:ring-blue-500 focus:border-blue-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md" />
        </div>
        <button type="submit" className="w-full bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-md">Sign In</button>
      </form>
    </div>
  );
};

export default SignIn;
