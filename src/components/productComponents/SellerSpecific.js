import React, { Component } from 'react';
import { connect } from 'react-redux';
import { get_user, get_products, get_user_product } from '../../ducks/reducer';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faSync } from '@fortawesome/free-solid-svg-icons';
import './sellerSpecific.css';

class SellerSpecific extends Component {
	constructor(props) {
		super(props);
		this.state = {};
	}
	//gets user of active session, and uses get_user_product to get the user specific product from database
	componentDidMount() {
		this.props.get_user();
		// console.log('seller specific user', this.props.user);
		this.props.get_user_product();
		// console.log('seller specific products', this.props.userProducts);
	}

	render() {
		// maps over user specific array brought in from props
		let sellerSpecific = this.props.userProducts.map((product, i) => {
			return (
				<div>
					<div>
						{i}
					</div>
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
						<img src={product.img_url} alt="" />
					</div>
				</div>
			);
		});
		//returns the mapped array of seller specific products
		return (
			<div className="seller-specific-container">
				<div>
					<a href="/dashboard">
						<button className="seller-specific-dashboard-button">
							Dashboard
						</button>
					</a>
					<div className="seller-specific-container">
						{sellerSpecific}
					</div>
				</div>
			</div>
		);
	}
}
const mapStateToProps = state => state;

export default connect(mapStateToProps, {
	get_user,
	get_products,
	get_user_product
})(SellerSpecific);
