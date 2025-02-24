const express = require('express');
const morgan = require('morgan');

const app = express(); 

app.use(morgan('dev'));

app.get('/products', (req, res) => {
    res.send('Obteniendo producto');    
})
app.post('/products', (req, res) => {
    res.send('Creando prodcutos');    
})
app.put('/products', (req, res) => {
    res.send('Actualizando prodcutos');    
})
app.delete('/products', (req, res) => {
    res.send('Eliminando prodcutos');    
})
app.get('/products/:id', (req, res) => {
    res.send('Obteniendo un producto');    
})

app.listen(3000);
console.log('Server on port 3000');