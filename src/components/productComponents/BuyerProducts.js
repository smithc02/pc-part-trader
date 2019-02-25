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

	render() {
		let productDisplay = this.props.products.map((product, i) => {
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
					<div>
						<div>
							{this.props.user.username}: Buyer
						</div>
						<div>
							<form action="/login">
								<button
									className="dashboard-logout-button"
									onClick={() => this.props.logout()}>
									Logout
								</button>
							</form>
						</div>
					</div>
				</h1>
				<div>
					<h1 className="parts_for_sale">All parts for sale!</h1>
				</div>
				<div>
					{productDisplay}
				</div>
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
