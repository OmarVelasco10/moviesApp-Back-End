const express = require('express');
const { dbConnection } = require('./src/database/config');
const morgan = require('morgan');
var cors = require('cors');
require('dotenv').config();


//Create the express server
const app = express();

//Database
dbConnection();

//CORS
app.use(cors());

// Public directory
app.use(express.static('public'));

// Reading and parsing the body
app.use( express.json());

// Using Morgan to debug
app.use(morgan('tiny'));

//Routes
app.use('/api/auth', require('./src/routes/auth'));
app.use('/api/reviews', require('./src/routes/reviews'));


//Listen to request
app.listen(process.env.PORT || 3000, () => {
    console.log(`Servidor corriendo en puerto ${process.env.PORT}`);
})