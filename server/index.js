require('dotenv').config();
const express = require('express');
const app = express();
const massive = require('massive');
const session = require('express-session');
const { json } = require('body-parser');
const auth = require('./authcontroller');
const product = require('./productController');
const paypal = require('./paypalController');
const path = require('path');

app.use(json());

app.use(
	session({
		secret: process.env.SECRET,
		resave: true,
		saveUninitialized: false,
		cookie: {
			maxAge: 1000 * 60 * 60 * 24 * 7
		}
	})
);

//hosting pointing to build folder
app.use(express.static(`${__dirname}/../build`));

//paypal reducer
massive(process.env.CONNECTION_STRING)
	.then(dbInstance => {
		app.set('db', dbInstance);
		console.log('db connected');
	})
	.catch(err => console.log(err));

//user endpoints
app.post('/api/register', auth.register); // register a new user in db
app.post('/api/login', auth.login); //login existing user
app.get('/api/user', auth.get_user); // get user logged in
app.get('/api/logout', auth.logout); // logout session of current user

//product endpoints
app.post('/api/user/newproduct', product.new_product); // add new product to db
app.put('/api/user/updateproduct/:id', product.update_product); //edit existing product in db
app.get('/api/product', product.get_all_product); // get all existing products
app.delete('/api/user/removeproduct/:id', product.remove_product); // remove product from db
app.get('/api/user/userproduct', product.get_user_product); // get all active user products for seller specific page
app.get('/api/user/productbuyer', product.get_product_buyer); // get joined statement of products with User Ids.

//paypal endpoints
app.post('/api/paypal/confirmation', paypal.purchaseConfirmation); //sends email to the users email of purchase confirmation

app.get('*', (req, res) => {
	res.sendFile(path.join(__dirname, '../build/index.html'));
});

app.listen(process.env.EXPRESS_PORT, () => {
	console.log(`Server - Listening on ${process.env.EXPRESS_PORT}`);
});
