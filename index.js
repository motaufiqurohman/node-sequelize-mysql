const express = require('express');
const app = express();

app.use(express.json());

const usersRoute = require('./routers/users');
app.use('/api/users', usersRoute);
const productsRoute = require('./routers/products');
app.use('/api/products', productsRoute);
const cartsRoute = require('./routers/carts');
app.use('/api/carts', cartsRoute);
const paymentsRoute = require('./routers/payments');
app.use('/api/payments', paymentsRoute);

app.listen(3000, () => {
    console.log('Server running on port 3000');
})