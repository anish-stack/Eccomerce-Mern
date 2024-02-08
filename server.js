const express = require('express');
const app = express();
const dotenv = require('dotenv');
dotenv.config();
const Port = process.env.PORT || 5000;
const ConnectDB = require('./database/db');

const cors = require('cors');
const UserRoutes = require('./routes/userroutes');
const cookiesParser = require('cookie-parser');
const Paymentrouter = require('./routes/paymentRoutes');

ConnectDB();
// const allowedOrigins = ['https://seoneg7g.com', 'http://localhost:3000'];

<<<<<<< HEAD
app.use(cors())
=======
app.use(cors());
>>>>>>> c10f312ef67122d9801bd75f3bc12efcb77568e6


app.use(cookiesParser())
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/api/v1', UserRoutes);
app.use('/api/v2', Paymentrouter);

app.use('/', (req, res) => {
  res.send(`<h2>Welcome t the ApI</h2>`);
});

app.listen(Port, () => {
  console.log(`Server is running on ${Port}`);
});
