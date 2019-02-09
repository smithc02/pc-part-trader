require('dotenv').config();
const express = require('express');
const app = express();
const massive = require('massive');
const session = require('express-session');
const { json } = require('body-parser');
const auth = require('./authcontroller');

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

massive(process.env.CONNECTION_STRING)
	.then(dbInstance => {
		app.set('db', dbInstance);
		console.log('db connected');
	})
	.catch(err => console.log(err));

//user endpoints
app.post('/api/register', auth.register); // register a new user
app.post('/api/login', auth.login); //login existing user
app.get('/api/user', auth.get_user); // get users
app.get('/api/logout', auth.logout); // logout session of current user

app.listen(process.env.EXPRESS_PORT || 4000, () => {
	console.log(`Listening on ${process.env.EXPRESS_PORT}`);
});
