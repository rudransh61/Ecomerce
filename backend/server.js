const express = require('express');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const cors = require('cors');
const paypal = require('@paypal/checkout-server-sdk');

const clientId = 'YOUR_PAYPAL_CLIENT_ID';
const clientSecret = 'YOUR_PAYPAL_CLIENT_SECRET';

const environment = new paypal.core.SandboxEnvironment(clientId, clientSecret);
const client = new paypal.core.PayPalHttpClient(environment);


const app = express();

app.use(express.json());
app.use(cors());

mongoose.connect('mongodb://127.0.0.1:27017/ecomerce', { useNewUrlParser: true }).then(() => { console.log("DB connected") })
const userSchema = new mongoose.Schema({
  email: String,
  password: String,
  cart: [{
    name: String,
    price: {
      type: Number,
      default: 0.0
    }
  }]
});

const User = mongoose.model('User', userSchema);

app.post('/signin', async (req, res) => {
  const { email, password } = req.body;

  try {
    // Check if user with the provided email already exists
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      // If user already exists, return a response indicating that
      return res.status(409).json({ message: 'User already exists' });
    }

    // Hash the password
    // const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user with the provided email and hashed password
    await User.create({ email, password: password });

    // Send a response with the redirect URL
    res.status(200).json({ redirectUrl: 'http://localhost:5173/login' });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});
app.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    // Find the user with the provided email
    const user = await User.findOne({ email });

    // If user doesn't exist, return an error
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Compare the provided password with the hashed password in the database
    const isPasswordValid = password === user.password;

    // If passwords don't match, return an error
    if (!isPasswordValid) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    // If credentials are valid, generate a JWT token containing the user's email
    const token = jwt.sign({ email: user.email }, 'your_secret_key', { expiresIn: '1h' });

    // Return the token and user's name as a response
    res.status(200).json({ token, redirectUrl: 'http://localhost:5173/', name: user.name, email: user.email });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});
app.post('/add-to-cart/:email/:itemName/:itemPrice', async (req, res) => {
  try {
    const { email, itemName, itemPrice } = req.params; // Retrieve parameters from URL params
    // Find the user with the provided email
    const user = await User.findOne({ email });

    // If user doesn't exist, return an error
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Add the item to the user's cart
    user.cart.push({ name: String(itemName), price: itemPrice });
    await user.save();

    // Return success response
    res.status(200).json({ message: 'Item added to cart successfully' });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

app.get('/get-cart-items', async (req, res) => {
  const { email } = req.query;

  try {
    // Find the user with the provided email
    const user = await User.findOne({ email });

    // If user doesn't exist, return an error
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Return the user's cart items
    res.status(200).json({ cartItems: user.cart });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

app.post('/create-paypal-payment', async (req, res) => {
  const { itemName, itemPrice } = req.body;

  // Create PayPal order
  const request = new paypal.orders.OrdersCreateRequest();
  request.prefer('return=representation');
  request.requestBody({
    intent: 'CAPTURE',
    purchase_units: [{
      amount: {
        currency_code: 'USD',
        value: itemPrice.toString(),
      },
      description: itemName,
    }],
  });

  try {
    const response = await client.execute(request);
    const orderId = response.result.id;
    const redirectUrl = response.result.links.find(link => link.rel === 'approve').href;

    res.json({ orderId, redirectUrl });
  } catch (error) {
    console.error('Error creating PayPal order:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});





app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
