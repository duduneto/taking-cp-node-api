var path = require('path');
global.uploads = path.resolve(__dirname+"/uploads");

const express = require('express');
const app = express();

//Routes
const userRoutes = require('./routes/users');
const postRoutes = require('./routes/posts');

require('./config/sequelize');

// Criar uma codificação padrão para as URL (Sanitizar URL's)
app.use(express.urlencoded({
    extended: true
}));
// Conseguir ler o corpo das requisições
app.use(express.json());

app.use('/user', userRoutes);
app.use('/post', postRoutes);

app.listen(3333, function() {
    console.log('Server is running')
})