import React, { Component } from 'react';
import { connect } from 'react-redux';
import { get_user, get_products } from '../../ducks/reducer';
import axios from 'axios';
import './sellerProducts.css';

class SellerProducts extends Component {
	constructor() {
		super();
		this.state = {
			products: []
		};
	}
	componentDidMount() {
		this.props.get_user();
		// console.log('specific user product', this.props.get_products());

		axios.get('/api/product').then(res => {
			// console.log('Get all products (SellerProducts', res);
			this.setState({ products: res.data });
			console.log('SellerProducts products', this.state.products);
		});
		// console.log('sellerproduct component mount user', this.props.user);
	}
	render() {
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
							<div>
								<img
									className="sellerProductImages"
									src={this.props.img_url}
									alt={this.props.product_type}
								/>
							</div>
						</div>
					: <h1>loading</h1>}
			</div>
		);
	}
}

const mapStateToProps = state => state;

export default connect(mapStateToProps, {
	get_user,
	get_products
})(SellerProducts);
