const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const routes = require('./routes');
const session = require('express-session');
require('dotenv').config()
const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
const corsOptions = {
  origin: 'http://localhost:3003',
  credentials: true, // Enable credentials (cookies, authorization headers)
};
app.use(cors(corsOptions));
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(bodyParser.json());
app.use(session({
  secret: 'your_secret_key',
  resave: false,
  saveUninitialized: false,
}));

// MongoDB Connection
mongoose.connect('mongodb+srv://shubgiri:7qhrE2DzdiGbuWwl@cluster0.tmsr2mk.mongodb.net/?retryWrites=true&w=majority', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => {
  console.log('Connected to MongoDB');

});

routes(app);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

