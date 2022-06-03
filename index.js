const express = require('express');
const cors = require('cors');
const { dbConnection } = require('./databases/config');

require('dotenv').config();
console.log(process.env);

// Creates express server
const app = express();

// Database connect
dbConnection();

//reading and parsing data
app.use(express.json());

app.use(cors());

// rutas
app.use(express.static('public'));
app.use('/api/auth', require('./routes/auth'));

// Listener
app.listen(process.env.PORT, ()=>{
    console.log(`Servidor corriendo en puerto:${process.env.PORT}` );
});