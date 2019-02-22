module.exports = {
	new_product: (req, res) => {
		const dbInstance = req.app.get('db');
		const { product_name, info, product_type, img_url } = req.body;

		console.log(req.session.user);
		if (req.session.user) {
			dbInstance.product_endpoints
				.add_product([
					product_name,
					info,
					product_type,
					req.session.user.user_id,
					img_url
				])
				.then(data => {
					console.log('response', data);
					res.status(200).json(data);
				})
				.catch(err => {
					res.status(500).send({ error: 'Error with new_product' });
					console.log(err);
				});
		} else {
			console.log('Please log in! (new_product)');
		}
	},
	update_product: (req, res) => {
		const dbInstance = req.app.get('db');
		const { product_name, info, product_type } = req.body;
		const { id } = req.params;
		console.log(req.params.id);

		if (req.session.user) {
			dbInstance.product_endpoints
				.update_product([
					+id,
					product_name,
					info,
					product_type,
					img_url,
					req.session.user.id
				])
				.then(response => res.status(200).send(response))
				.catch(err => {
					res
						.status(500)
						.send({ error: 'Error with update_product' });
					console.log(err);
				});
		} else {
			console.log('Please log in! (update_product)');
		}
	},
	get_all_product: (req, res) => {
		const dbInstance = req.app.get('db');
		if (req.session.user) {
			dbInstance.product_endpoints
				.get_all_product()
				.then(response => {
					console.log('response', response);

					res.status(200).send(response);
				})
				.catch(err => {
					console.log(response);
					res
						.status(500)
						.send({ error: 'Error with get_all_product' });
					console.log(err);
				});
		} else {
			console.log('Please log in! (get_all_product)');
		}
	},

	remove_product: (req, res) => {
		const dbInstance = req.app.get('db');
		const { params } = req;

		if (req.session.user) {
			dbInstance.product_endpoints
				.remove_product(params.id)
				.then(product => res.status(200).send(product))
				.catch(err => {
					res
						.status(500)
						.send({ error: 'Error with remove_product' });
					console.log(err);
				});
		} else {
			console.log('Please log in! (remove_product');
		}
	},
	get_user_product: (req, res) => {
		console.log('user id', req.session.user.user_id);
		const dbInstance = req.app.get('db');
		dbInstance.product_endpoints
			.get_user_product(req.session.user.user_id)
			.then(product => {
				console.log('response', product);
				res.status(200).send(product);
			})
			.catch(response => {
				console.log(response);
				res.status(500).send({
					error: 'Error getting products specific to users'
				});
			});
	},
	get_product_buyer: (req, res) => {
		const dbInstance = req.app.get('db');
		if (req.session.user) {
			dbInstance.product_endpoints
				.get_product_buyer()
				.then(product => {
					// console.log('response', product);
					res.status(200).send(product);
				})
				.catch(response => {
					console.log(response);
					res.status(500).send({
						error: 'Error with get_product_buyer'
					});
				});
		} else {
			console.log('Please log in! (get_product_buyer');
		}
	}
};
