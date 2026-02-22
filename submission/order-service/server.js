const express = require('express');
const app = express();
app.get('/', (req, res) => res.send('Order Service on port 3002'));
app.get('/orders', (req, res) => res.json([{id:1,productId:101,userId:1}]));
app.listen(3002, () => console.log('Order Service on port 3002'));
