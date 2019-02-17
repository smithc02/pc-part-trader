require('dotenv').config();
const bcrypt = require('bcryptjs');
const nodemailer = require('nodemailer');
const transporter = nodemailer.createTransport({
	service: 'gmail',
	auth: {
		user: process.env.DB_USER,
		pass: process.env.DB_PASS
	}
});

module.exports = {
	register: async (req, res, next) => {
		const { username, password, email, img_url, role } = req.body;
		const db = req.app.get('db');
		const result = await db.user_endpoints.get_user([username]);
		const existingUser = result[0];
		try {
			if (existingUser) {
				return res.status(409).send('Username taken');
			}
			const salt = bcrypt.genSaltSync(12);
			const hash = bcrypt.hashSync(password, salt);
			await db.user_endpoints.add_user([
				username,
				hash,
				email,
				img_url,
				role
			]);

			const mailOptions = {
				from: 'pcpartstraders@gmail.com',
				to: req.body.email,
				subject: 'New Account',
				text: `Thank you ${req.body.username} for signing up as a ${req
					.body.role}! We look forward to working with you!`
			};
			console.log(req.body.role);

			transporter.sendMail(mailOptions, function(error, info) {
				if (error) {
					console.log(error);
				} else {
					console.log('Email send:' + info.response);
				}
			});
		} catch (err) {
			console.log(err);
			res.status(401).json('Register Failed');
		}

		console.log(req.session.user);
		return res.status(201).send(req.session.user);
	},

	login: (req, res) => {
		const { username, password } = req.body;
		const db = req.app.get('db');
		db.user_endpoints
			.get_user(username)
			.then(async response => {
				console.log(response);
				if (!response.length) {
					res.status(401).json({ error: 'No user found' });
				} else {
					const isMatch = await bcrypt.compare(
						password,
						response[0].hash
					);
					if (!isMatch) {
						res.status(401).json({ error: 'Shitty H4x0r' });
					} else {
						req.session.user = {
							username: response[0].username,
							email: response[0].email,
							img_url: response[0].img_url,
							role: response[0].role,
							user_id: response[0].id
						};
						res.status(200).json({
							username: response[0].username,
							email: response[0].email,
							img_url: response[0].img_url,
							role: response[0].role,
							user_id: response[0].id
						});
						console.log(
							'Checking user session info',
							req.session.user
						);
					}
				}
			})
			.catch(err => console.log(err));
	},

	get_user: (req, res) => {
		if (req.session.user) {
			res.json(req.session.user);
		} else {
			res.status(401).json({ Error: 'Please log in' });
		}
	},

	logout: async (req, res) => {
		if (req.session.destroy()) {
			console.log('You have logged out successfully');
			return res
				.status(200)
				.json({ Update: 'You have logged out successfully' });
		}
	}
};
