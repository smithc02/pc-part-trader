const bcrypt = require('bcryptjs');

module.exports = {
	register: async (req, res, next) => {
		const { username, password, email, img_url, role } = req.body;
		const db = req.app.get('db');
		const result = await db.get_user([username]);
		const existingUser = result[0];
		if (existingUser) {
			return res.status(409).send('Username taken');
		}
		const salt = bcrypt.genSaltSync(12);
		const hash = bcrypt.hashSync(password, salt);
		const registeredUser = await db.add_user([
			username,
			hash,
			email,
			img_url,
			role
		]);
		const user = registeredUser[0];
		req.session.user = {
			username: user.username,
			id: user.id,
			email: user.email,
			img_url: user.img_url
		};
		return res.status(201).send(req.session.user);
	},

	login: async (req, res) => {
		const { username, password } = req.body;
		const foundUser = await req.app.get('db').get_user([username]);
		const user = foundUser[0];
		if (!user) {
			return res
				.status(401)
				.send(
					'User not found. Please register as a new user before logging in'
				);
		}
		const isAuthenticated = bcrypt.compare(password, user.hash);
		if (!isAuthenticated) {
			return res.status(403).send('Incorrect password');
		}
		req.session.user = {
			id: user.id,
			username: user.username
		};
		return res.send(req.session.user);
	},

	get_user: (req, res) => {
		if (req.session.user) {
			res.json(req.session.user);
		} else {
			res.status(401).json({ Error: 'Please log in' });
		}
	},

	logout: async (req, res) => {
		req.session.destroy();
		return res
			.status(200)
			.send({ Update: 'You have logged out successfully' });
	}
};
