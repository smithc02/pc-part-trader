const bcrypt = require('bcryptjs');

module.exports = {
	register: async (req, res, next) => {
		const { username, password, email, img_url, role } = req.body;
		const db = req.app.get('db');
		const result = await db.user_endpoints.get_user([username]);
		const existingUser = result[0];
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
							user_id: response[0].idß
						});
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
		req.session.destroy();
		return res
			.status(200)
			.json({ Update: 'You have logged out successfully' });
	}
};
