const express = require('express');
const app = express();

//Routes
const userRoutes = require('./routes/users')

require('./config/sequelize');

app.use(express.urlencoded({
    extended: true
}));

app.use(express.json());

app.use('/user', userRoutes);

app.listen(3333, function() {
    console.log('Server is running')
})