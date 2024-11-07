const express = require('express');
const mongoose = require('mongoose');
const lolhelp = require('./routes/championRoutes');
const cors = require('cors'); // Import cors
require('dotenv').config();

const app = express();
app.use(cors()); // Enable CORS for all routes

app.use(express.json());

//Connect to MongoDB using mongoose
mongoose.connect(process.env.MONGO_URI)
.then(() => console.log("MongoDB connected successfully!"))
.catch((error) => console.error("MongoDB connection error:", error));

app.use('/champion', lolhelp);

// Start server on port 5000
const PORT = process.env.PORT || 5000; // Use environment variable or default to 5000
app.listen(PORT, () => {
  console.log("Server is running on http://localhost:"+PORT);
});
