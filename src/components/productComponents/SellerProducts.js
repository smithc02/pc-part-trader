import React, { Component } from 'react';
import { connect } from 'react-redux';
import { get_user, get_products } from '../../ducks/reducer';
import axios from 'axios';
import './sellerProducts.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSync } from '@fortawesome/free-solid-svg-icons';

class SellerProducts extends Component {
	constructor(props) {
		super(props);
		this.state = {
			products: []
		};
	}
	componentDidMount() {
		this.props.get_user();
		// this.props.get_products();
		// console.log('specific user product', this.props.get_products());
		axios.get('/api/product').then(res => {
			// console.log('Get all products (SellerProducts', res);
			this.setState({ products: res.data });
			// console.log('SellerProducts products', this.state.products);
		});
		// console.log('sellerproduct component mount user', this.props.user);
	}
	render() {
		// if (!this.props.loggedIn) {
		// 	return <Redirect push to="/dashboard" />;
		// }
		return (
			<div className="seller_product_container">
				{!this.props.loading
					? <div>
							<div>
								{this.props.user_id}
							</div>
							<div>
								{this.props.product_name}
							</div>
							<div>
								{this.props.info}
							</div>
							<div>
								{this.props.product_type}
							</div>
							<div />
							<div>
								<img
									className="sellerProductImages"
									src={this.props.img_url}
									alt={this.props.product_type}
								/>
							</div>
						</div>
					: <div>
							{/* <FontAwesomeIcon
								color="lightgreen"
								icon={faSync}
								spin
								size="8x"
							/> */}
						</div>}
			</div>
		);
	}
}

const mapStateToProps = state => {
	console.log(state);
	return state;
};
export default connect(mapStateToProps, {
	get_user,
	get_products
})(SellerProducts);
