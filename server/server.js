require('./config/config')

const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
 
// parse application/json
app.use(bodyParser.json());

app.use( require('./routes/usuario'));
 


mongoose.connect('mongodb://localhost:27017/cafe', (err, res) => {
     if(err) throw err;
     console.log('base de datos Online');
});
 
app.listen(process.env.PORT, () => {
    console.log('Escuchando en el puerto: ', process.env.PORT);
});