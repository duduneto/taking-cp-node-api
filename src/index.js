const express = require('express');
const app = express();

app.get('/api', function(resquest, response) {
    response.send('<h1>Hellow Takers</h1>')
})

app.listen(3333, function() {
    console.log('Server is running')
})