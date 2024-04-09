const express = require('express');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const cors = require('cors');

const app = express();

app.use(express.json());
app.use(cors());

mongoose.connect('mongodb://127.0.0.1:27017/ecomerce', { useNewUrlParser: true }).then(()=>{console.log("DB connected")})
const userSchema = new mongoose.Schema({
  email:  String ,
  password: String,
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
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user with the provided email and hashed password
    await User.create({ email, password: hashedPassword });

    // Send a response with the redirect URL
    res.status(200).json({ redirectUrl: 'http://localhost:5173/login' });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});


app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
