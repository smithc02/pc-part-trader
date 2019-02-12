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
			user_id: '',
			img_url: ''
		};
	}
	componentDidMount() {
		axios.get('/api/product').then(res => {
			// console.log('Get all products', res);
			this.setState({ products: res.data });
		});

		get_user();
	}

	handleLogout = () => {
		if (this.props.user.username) {
			axios.get('/api/logout');
		}
	};

	handleSubmit = e => {
		if (this.props.loggedIn === true) {
			e.preventDefault();
			this.props.new_product(
				this.state.product_name,
				this.state.info,
				this.state.product_type,
				this.state.img_url
			);

			this.setState({
				product_name: '',
				info: '',
				product_type: '',
				img_url: ''
			});
		} else {
			alert('You are not logged in!');
		}
	};

	render() {
		console.log('username', this.props.user.username);
		console.log('user_id', this.props.user.id);
		console.log('products', this.state.products);

		// console.log(this.props.user);
		// console.log('products list', this.state.products);

		if (!this.props.user.username) {
			return (
				<div>
					<h1>You are not logged in!</h1>{' '}
					<Link to="/login">Login</Link>
				</div>
			);
		}
		if (this.props.user.role === 'Buyer') {
			let productDisplay = this.state.products.map((product, i) => {
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
						{this.props.user.username}: Buyer
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
			let productDisplay = this.state.products.map((product, i) => {
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
					<header>
						<h1>
							{this.props.user.username}: Seller
						</h1>
					</header>
					<div>
						<form action="/">
							<button onClick={this.handleLogout}>Logout</button>
						</form>

						<h1> All parts for sale!</h1>
						<div>
							{productDisplay}
						</div>
						<div>
							<form onSubmit={this.handleSubmit}>
								<input
									value={this.state.product_name}
									type="text"
									placeholder="Product Name"
									onChange={e =>
										this.setState({
											product_name: e.target.value
										})}
								/>
								<input
									value={this.state.info}
									type="text"
									placeholder="Product Information"
									onChange={e =>
										this.setState({
											info: e.target.value
										})}
								/>
								<input
									value={this.state.product_type}
									type="text"
									placeholder="Product Type"
									onChange={e =>
										this.setState({
											product_type: e.target.value
										})}
								/>
								<input
									value={this.state.img_url}
									type="text"
									placeholder="Image URL"
									onChange={e =>
										this.setState({
											img_url: e.target.value
										})}
								/>
								<button>List Item</button>
							</form>
						</div>
					</div>
				</div>
			);
		}
	}
}

const mapStateToProps = state => state;

export default connect(mapStateToProps, { get_user, new_product })(Dashboard);
