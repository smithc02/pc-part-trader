require('dotenv').config();
const express = require('express');
const app = express();
const PORT = 4000;
const massive = require('massive');
const session = require('express-session');
const { json } = require('body-parser');
const controller = require('./controller');

app.use(json());

app.use(
	session({
		secret: process.env.SECRET,
		resave: true,
		saveUninitialized: false
	})
);

massive(process.env.CONNECTION_STRING).then(dbInstance => {
	app.set('db', dbInstance);
	console.log('db connected');
});

app.listen(PORT, () => {
	console.log(`Listening on ${PORT}`);
});
