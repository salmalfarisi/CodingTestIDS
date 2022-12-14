var path = require('path');
const express = require('express');
const morgan = require("morgan");
const helmet = require("helmet");
const cors = require("cors");
const bodyParser = require('body-parser');
const fileUpload = require("express-fileupload");
const account = require('./Controllers/account');
const product = require('./Controllers/product');
const customer = require('./Controllers/customer');
const transaction = require('./Controllers/transaction');

const dotenv = require('dotenv');

// get config vars
dotenv.config();

// access config var
process.env.TOKEN_SECRET;

const app = express()
app.use(morgan("common"))
app.use(helmet());
app.use(cors());
app.use(fileUpload());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.post('/account/login', account.login)
app.get('/account/logout', account.logout)
app.put('/account/updateprofile/:id', account.updateprofile)
app.put('/account/updatepassword/:id', account.updatepassword)

app.get('/product/index', product.index)
app.post('/product/store', product.store)
app.get('/product/show/:id', product.show)
app.put('/product/update/:id', product.update)
app.patch('/product/destroy/:id', product.destroy)

app.get('/customer/index', customer.index)
app.post('/customer/store', customer.store)
app.get('/customer/show/:id', customer.show)
app.put('/customer/update/:id', customer.update)
app.patch('/customer/destroy/:id', customer.destroy)

app.get('/transaction/index', transaction.index)
app.post('/transaction/store', transaction.store)
app.get('/transaction/show/:id', transaction.show)
app.put('/transaction/update/:id', transaction.update)

app.listen(4000, () => {
	console.log("Server running on port 4000");
});