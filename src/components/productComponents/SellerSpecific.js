import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import UpdateProducts from './UpdateProducts';
import {
	get_user,
	get_products,
	get_user_product,
	delete_product
} from '../../ducks/reducer';
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

	componentDidUpdate(prevProps) {
		// console.log('componentdidmount', prevProps);
		if (prevProps.userProducts.length !== this.props.userProducts.length) {
			this.props.get_user_product();
			// console.log('component update 2', this.props.userProducts);
		}
	}

	handleDelete(id) {
		this.props.delete_product(id);
		this.props.get_user_product();
		this.props.get_products();
	}

	render() {
		// maps over user specific array brought in from props

		let sellerSpecific = this.props.userProducts.map((product, i) => {
			return (
				<div className="seller-specific-map" key={product.id}>
					<div className="seller-specific-another-container">
						<div className="seller-specific-img-container">
							<div className="seller-specific-img-sizing">
								<img
									className="seller-specific-img"
									src={product.img_url}
									alt="img"
								/>
							</div>
						</div>
					</div>
					<div className="seller-specific-product-container">
						<div className="seller-specific-info-holder">
							<div className="seller-specific-price">
								{product.price}
							</div>
							<div className="seller-specific-name">
								{product.product_name}
							</div>
							<div className="seller-specific-info">
								{product.info}
							</div>
							<div className="seller-specific-type">
								{product.product_type}
							</div>
						</div>
						<div className="seller-specific-button-holder">
							<div>
								<button
									className="seller-specific-remove-button"
									onClick={() =>
										this.handleDelete(product.id)}>
									Remove
								</button>
							</div>
							<div>
								<UpdateProducts id={product.id} />
							</div>
						</div>
					</div>
				</div>
			);
		});
		//returns the mapped array of seller specific products
		if (this.props.user.username) {
			return (
				<div className="">
					<div className="seller-specific-navBar">
						<a href="/dashboard">
							<button className="seller-specific-dashboard-button">
								My Dashboard
							</button>
						</a>
					</div>

					<div className="seller-specific-display">
						{sellerSpecific}
					</div>
				</div>
			);
		} else {
			return (
				<div>
					<div>
						<h1 className="seller-specific-logged-out">
							You are not logged in!
						</h1>
					</div>
					<div>
						<Link className="seller-specific-login" to="/login">
							Login
						</Link>
					</div>
				</div>
			);
		}
	}
}
const mapStateToProps = state => state;

export default connect(mapStateToProps, {
	get_user,
	get_products,
	get_user_product,
	delete_product
})(SellerSpecific);
