const express = require('express');
const app = express();
const dotenv = require('dotenv');
dotenv.config();
const Port = process.env.PORT || 4000;
const ConnectDB = require('./database/db');
const cors = require('cors');
const UserRoutes = require('./routes/userroutes');
const cookiesParser = require('cookie-parser')

ConnectDB();

// Middleware
app.use(cors());
app.use(cookiesParser())
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
const errorHandler = (err, req, res, next) => {
  console.error('Unhandled error:', err);

  // Customize the error response based on your application's needs
  res.status(500).json({
    success: false,
    message: 'Internal Server Error',
  });
};

// Add the error handler middleware to the end of the middleware stack
app.use(errorHandler);
// Routes
app.use('/api/v1', UserRoutes);
app.use('/', (req,res)=>{
    res.send(`<h2>Welcome to the API</h2>`);
});

app.listen(Port, () => {
  console.log(`Server is running on ${Port}`);
});
