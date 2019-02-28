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
import './buyerProduct.css';
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
				<div className="buyer-products-product-map" key={product.id}>
					<div className="buyer-product-just-another-container">
						<div className="buyer-product-img-container">
							<div className="buyer-product-img-sizing">
								<img
									className="buyer-product-img"
									src={product.img_url}
									alt="product"
								/>
							</div>
						</div>
					</div>
					<div className="buyer-product-text-container">
						<div className="buyer-product-name">
							{product.product_name}
						</div>
						<div className="buyer-product-info">
							{product.info}
						</div>
						<div className="buyer-product-type">
							{product.product_type}
						</div>
						<div className="buyer-product-price">
							{product.price}
						</div>
						<div>
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
					</div>
				</div>
			);
		});
		return (
			<div>
				<div>
					<div>
						<h1 className="parts-for-sale">All Parts for Sale!</h1>
					</div>
				</div>
				<div className="buyer-products-product-display">
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
