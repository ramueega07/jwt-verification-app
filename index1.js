const express = require('express');
const jwt = require('jsonwebtoken');
const bodyParser = require('body-parser');

const app = express();
const PORT = 3000;

// Your Kore.ai Client Secret (Replace with your actual secret)
const JWT_SECRET = 'iUobNKhNXolk4D25CSr4/1mL5d2ac6NIOEvHeYYxuNA=';

app.use(bodyParser.json());

// Verify JWT Token Endpoint
app.post('/verify', (req, res) => {
  const { token } = req.body;

  if (!token) {
    return res.status(400).json({ error: 'Token is required' });
  }

  try {
    // Verify the token using the client secret
    const decoded = jwt.verify(token, JWT_SECRET, { algorithms: ['HS256'] });
    return res.status(200).json({ message: 'Token is valid', decoded });
  } catch (err) {
    console.error("JWT Verification Error:", err.message);
    return res.status(401).json({ error: 'Invalid token', details: err.message });
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
