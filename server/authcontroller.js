const bcrpyt = require('bcryptjs');

const register = async (req, res) => {
	const { username, password, email, img_url, role } = req.body;
	const db = req.app.get('db');
	const hash = await bcrpyt.hash(password, 10);
	console.log(db);
	try {
		const response = await db.add_user([
			username,
			hash,
			email,
			img_url,
			role
		]);
		console.log(response);
		const user = response[0];
		req.session.user = {
			username: user.username,
			email: user.email,
			img_url: user.img_url,
			role: user.role,
			id: user.id
		};
		res.status(200).json(response[0].username);
	} catch (err) {
		console.log(err);
		res.status(401).json('Error occured with register');
	}
};

const login = async (req, res) => {
	const { username, password } = req.body;
	const db = req.app.get('db');
	db
		.find_user(username)
		.then(async response => {
			console.log(response);
			if (!response.length) {
				res.status(401).json({ Error: 'No user found' });
			} else {
				const isMatch = await bcrypt.compare(
					password,
					response[0].hash
				);
				if (!isMatch) {
					res.status(401).json({ Error: 'Unable to login' });
				} else {
					req.session.user = { username: response[0].username };
					res.status(200).json({ username: response[0].username });
				}
			}
		})
		.catch(err => console.log(err));
};

const get_user = (req, res) => {
	if (req.session.user) {
		res.json(req.session.user);
	} else {
		res.status(401).json({ Error: 'Please log in' });
	}
};

const logout = async (req, res) => {
	req.session.destroy();
	return res.sendStatus(200);
};

module.exports = {
	register,
	get_user,
	login,
	logout
};
