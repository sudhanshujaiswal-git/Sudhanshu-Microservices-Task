const express = require('express');
const app = express();
app.get('/', (req, res) => res.send('User Service running on port 3000'));
app.listen(3000, () => console.log('User Service on port 3000'));
