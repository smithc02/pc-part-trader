import React, { Component } from 'react';
import { connect } from 'react-redux';
import { get_user, new_product } from '../ducks/reducer';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Products from './productComponents/Products';
import './dashboard.css';

class Dashboard extends Component {
	constructor() {
		super();
		this.state = {
			products: [],
			product_name: '',
			info: '',
			product_type: '',
			img_url: ''
		};
	}
	componentDidMount() {
		if (this.props.user.username) {
			axios.get('/api/product').then(res => {
				// console.log('Get all products', res);
				this.setState({ products: res.data });
			});
		}
	}
	handleLogout = () => {
		if (this.props.user.username) {
			axios.get('/api/logout');
		}
	};

	handleSubmit = e => {
		let { product_name, info, product_type, img_url } = this.state;
		e.preventDefault();
		this.props.new_product(product_name, info, product_type, img_url);

		this.setState({
			product_name: '',
			info: '',
			product_type: '',
			img_url: ''
		});
	};

	render() {
		// console.log(this.props.user);
		const { products } = this.state;
		console.log('products list', this.state.products);

		if (!this.props.user.username) {
			return <Link to="/login">Login</Link>;
		}
		if (this.props.user.role === 'Buyer') {
			let productDisplay = products.map((product, i) => {
				return (
					<Products
						key={i}
						product_name={product.product_name}
						info={product.info}
						product_type={product.product_type}
					/>
				);
			});

			return (
				<div>
					<h1>
						{this.props.user.username}'s Account
						<br />
						<form action="/login">
							<button onClick={this.handleLogout}>Logout</button>
						</form>
					</h1>

					<div>
						<div>
							<h1 className="parts_for_sale">
								All parts for sale!
							</h1>
						</div>
						{productDisplay}
					</div>
				</div>
			);
		} else {
			let productDisplay = products.map((product, i) => {
				return (
					<Products
						key={i}
						product_name={product.product_name}
						info={product.info}
						product_type={product.product_type}
					/>
				);
			});
			return (
				<div>
					<h1>
						{this.props.user.username}:
						<br />
						{this.props.user.role}
					</h1>
					<form action="/">
						<button onClick={this.handleLogout}>Logout</button>
					</form>

					<h1> All parts for sale!</h1>
					<div>
						{productDisplay}
					</div>
				</div>
			);
		}
	}
}

const mapStateToProps = state => state;

export default connect(mapStateToProps, { get_user, new_product })(Dashboard);
