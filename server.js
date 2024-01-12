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
const corsOption = {
  origin: 'https://seoneg7g.com',
  optionSuccessStatus:200
}

// Middleware
app.use(cors(corsOption));
app.use(cookiesParser())
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/api/v1', UserRoutes);
app.use('/', (req,res)=>{
    res.send(`<h2>Welcome to the API</h2>`);
});

app.listen(Port, () => {
  console.log(`Server is running on ${Port}`);
});
