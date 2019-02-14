require('dotenv').config();
const express = require('express');
const app = express();
const massive = require('massive');
const session = require('express-session');
const { json } = require('body-parser');
const auth = require('./authcontroller');
const product = require('./productController');

//imports for sockets

// const http = require('http').Server(app);
// const io = require('socket.io')(http);

// io.set('origins', '*:*');

// // socket event listeners
// io.on('connection', socket => {
// 	console.log('User connected'), socket.emit('Hello', { Hello: 'Hello!' });

// 	socket.on('disconnect', () => {
// 		console.log('user disconnected');
// 	});
// 	socket.on('room', data => {
// 		socket.join(data.room).emit('Joinedroom', data.room);
// 	});
// 	socket.on('leave', room => {
// 		socket.emit('leave', room).leave(room);
// 	});
// });

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

const http = require('http').Server(app);
const io = require('socket.io')(http);

io.set('origins', '*:*');

// socket event listeners
io.on('connection', socket => {
	console.log('User connected'), socket.emit('Hello', { Hello: 'Hello!' });

	socket.on('disconnect', () => {
		console.log('user disconnected');
	});
	socket.on('room', data => {
		socket.join(data.room).emit('Joinedroom', data.room);
	});
	socket.on('leave', room => {
		socket.emit('leave', room).leave(room);
	});
});

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
app.get('/api/user/user&product', product.get_user_product);

http.listen(process.env.EXPRESS_PORT, () => {
	console.log(`Server - Listening on ${process.env.EXPRESS_PORT}`);
});
