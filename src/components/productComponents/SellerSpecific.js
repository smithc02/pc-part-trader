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
						<img src={product.img_url} alt="" />
					</div>
					<div>
						<button
							className="seller-specific-remove-button"
							onClick={() => this.handleDelete(product.id)}>
							Remove
						</button>
					</div>
					<div>
						<UpdateProducts id={product.id} />
					</div>
				</div>
			);
		});
		//returns the mapped array of seller specific products
		if (this.props.user.username) {
			return (
				<div className="seller-specific-container">
					<div>
						<a href="/dashboard">
							<button className="seller-specific-dashboard-button">
								My Dashboard
							</button>
						</a>
						<div className="seller-specific-container">
							{sellerSpecific}
						</div>
					</div>
				</div>
			);
		} else {
			return (
				<div>
					<div>
						<h1>You are not logged in!</h1>
					</div>
					<div>
						<Link to="/login">Login</Link>
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
