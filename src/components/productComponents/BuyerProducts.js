import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
	get_user,
	get_products,
	logout,
	buyer_product,
	delete_product
} from '../../ducks/reducer';

class BuyerProducts extends Component {
	componentWillMount() {
		this.props.get_user();
		this.props.get_products();
	}

	handleDelete(id) {
		this.props.delete_product();
	}

	render() {
		let productDisplay = this.props.products.map((product, i) => {
			console.log(i);
			return (
				<div key={product.id}>
					<div>
						{product.product_name}
					</div>
					<div>
						{product.info}
					</div>
					<div>
						{product.product_type}
					</div>
					<div>
						<img src={product.img_url} alt="product" />
					</div>
					<div>
						{product.user_id}
					</div>
				</div>
			);
		});

		return (
			<div>
				<h1>
					{this.props.user.username}: Buyer
					<br />
					<form action="/login">
						<button
							className="dashboard-logout-button"
							onClick={() => this.props.logout()}>
							Logout
						</button>
					</form>
				</h1>

				<div>
					<h1 className="parts_for_sale">All parts for sale!</h1>
				</div>
				{productDisplay}
			</div>
		);
	}
}
const mapStateToProps = state => state;

export default connect(mapStateToProps, {
	get_user,
	get_products,
	logout,
	buyer_product,
	delete_product
})(BuyerProducts);
