import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
	get_user,
	get_products,
	logout,
	buyer_product,
	delete_product,
	purchase_confirmation
} from '../../ducks/reducer';
import PaypalExpressBtn from 'react-paypal-express-checkout';

class BuyerProducts extends Component {
	componentWillMount() {
		this.props.get_user();
		this.props.get_products();
	}

	render() {
		const onSuccess = payment => {
			this.props.purchase_confirmation(
				payment.address,
				payment.paymentID
			);
			window.alert('Your purchase was successful!');
			console.log('Payment successful!', payment);
			console.log('Payment address', payment.address);
		};
		const onCancel = data => {
			console.log('Payment cancelled!', data);
		};
		const onError = err => {
			console.log('Error!', err);
		};
		let env = 'sandbox';
		let currency = 'USD';
		let total = 1;

		const client = {
			sandbox:
				'AVbl63z427KBmZVKdWnjO8vI4jLxQHI9oKyTro9G1YIalW4ztU-xe3GjrH_kWkp2ha0TYcAkN8DMUptN'
		};
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
					<div>$1</div>
					<PaypalExpressBtn
						className="Paypalbutton"
						env={env}
						client={client}
						currency={currency}
						total={total}
						onError={onError}
						onCancel={onCancel}
						onSuccess={onSuccess}
					/>
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
	delete_product,
	purchase_confirmation
})(BuyerProducts);
