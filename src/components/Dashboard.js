import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { get_user, new_product, logout, get_products } from '../ducks/reducer';
import SellerProducts from './productComponents/SellerProducts';
import BuyerProducts from './productComponents/BuyerProducts';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSync } from '@fortawesome/free-solid-svg-icons';
import './dashboard.css';
import Modal from 'react-modal';
Modal.setAppElement('#root');

class Dashboard extends Component {
	constructor() {
		super();
		this.state = {
			products: [],
			product_name: '',
			info: '',
			product_type: '',
			img_url: '',
			showModal: false
		};
	}
	componentDidMount() {
		// axios.get('/api/product').then(res => {
		// 	console.log('Get all products (dashboard', res);
		// 	this.setState({ products: res.data });
		// });
		this.props.get_products();
		this.props.get_user().then(res => {
			console.log('userId', res, this.props.get_user());
		});
	}
	// change to redux if time permits
	componentDidUpdate(prevProps) {
		console.log('componentDidUpdate');
		if (prevProps.products.length !== this.props.products.length) {
			// axios.get('/api/product').then(res => {
			// 	console.log('Get all products (dashboard', res);
			// 	this.setState({ products: res.data });
			// });
			this.props.get_products();
		}
		console.log(this.state.products);
	}
	handleSubmit = e => {
		e.preventDefault();
		this.props.new_product(
			this.state.product_name,
			this.state.info,
			this.state.product_type,
			this.state.img_url
		);
		// axios.get('/api/product').then(res => {
		// 	console.log('Get all products (dashboard', res.data);
		// 	this.setState({ products: res.data });
		// });
		this.props.get_products();

		this.setState({
			product_name: '',
			info: '',
			product_type: '',
			img_url: ''
		});
	};
	listHandle(value) {
		console.log(value);
		this.setState({
			product_type: value
		});
	}
	handleOpenModal = () => {
		this.setState({ showModal: true });
	};

	handleCloseModal = () => {
		this.setState({ showModal: false });
	};
	render() {
		// console.log('username', this.props.user.username);
		// console.log('role', this.props.user.role);
		// console.log('products', this.state.products);
		// console.log('Dashboard state: products', this.state.products);
		// console.log('user', this.props.user);
		// console.log('products list', this.state.products);

		if (this.props.user.role === 'Buyer') {
			console.log('dashboard products redux', this.props.products);
			let productDisplay = this.props.products
				.sort((x, y) => x.id < y.id)
				.map((product, i) => {
					return (
						<BuyerProducts
							key={i}
							product_name={product.product_name}
							info={product.info}
							product_type={product.product_type}
							img_url={product.img_url}
						/>
					);
				});
			return (
				<div>
					<h1>
						{this.props.user.username}: Buyer
						<br />
						<form action="/login">
							<button
								className="dashboard-login-button"
								onClick={() => this.props.logout()}>
								Logout
							</button>
						</form>
					</h1>

					<div>
						<h1 className="parts_for_sale">All parts for sale!</h1>
					</div>
					{productDisplay}
				</div>
			);
		}
		if (this.props.user.role === 'Seller') {
			console.log('dashboard products redux', this.props.products);
			console.log('dashboard shit', this.props.products);
			let productDisplay = this.props.products
				.map((product, i) => {
					return (
						<SellerProducts
							key={i}
							product_name={product.product_name}
							info={product.info}
							product_type={product.product_type}
							img_url={product.img_url}
							user_id={product.user_id}
						/>
					);
				});
			return (
				<div>
					<div>
						<Link to="/sellerspecific">My Products</Link>
					</div>
					<header>
						<h1>
							{this.props.user.username}: Seller
						</h1>
					</header>
					<div>
						<form action="/login">
							<button
								className="dashboard-logout-button"
								onClick={() => this.props.logout()}>
								Logout
							</button>
						</form>

						<h1> All parts for sale!</h1>

						<div>
							<div>
								<button
									className="dashboard-modal-open"
									onClick={this.handleOpenModal}>
									{' '}Register a new product
								</button>
							</div>
							<Modal
								className="dashboard-modal"
								isOpen={this.state.showModal}
								contentLabel="Login Modal"
								onRequestClose={this.handleCloseModal}>
								<form
									className="dashboard-modal-form"
									onSubmit={this.handleSubmit}>
									<div>
										<input
											className="dashboard-product-name"
											value={this.state.product_name}
											type="text"
											placeholder="Product Name"
											onChange={e =>
												this.setState({
													product_name: e.target.value
												})}
										/>
									</div>
									<div>
										<input
											className="dashboard-product-info"
											value={this.state.info}
											type="text"
											placeholder="Product Information"
											onChange={e =>
												this.setState({
													info: e.target.value
												})}
										/>
									</div>
									<div>
										<input
											className="dashboard-product-img"
											value={this.state.img_url}
											type="text"
											placeholder="Image URL"
											onChange={e =>
												this.setState({
													img_url: e.target.value
												})}
										/>
									</div>
									<div>
										<select
											className="dashboard-modal-select"
											onChange={e =>
												this.listHandle(
													e.target.value
												)}>
											<option value="">
												{' '}Please Select
											</option>
											<option value="CPU">CPU</option>
											<option value="Motherboard">
												Motherboard
											</option>
											<option value="RAMM">RAMM</option>
											<option value="GPU">GPU</option>
											<option value="HardDrive">
												HardDrive
											</option>
											<option value="Monitor">
												Monitor
											</option>
										</select>
									</div>
									<div>
										<button className="dashboard-list-item-button">
											List Item
										</button>
									</div>
								</form>
							</Modal>
							<div>
								{productDisplay}
							</div>
						</div>
					</div>
				</div>
			);
		}
		if (!this.props.loggedIn) {
			return (
				<div>
					<h1>You are not logged in!</h1>{' '}
					<Link to="/login">Login</Link>
				</div>
			);
		}
		if (!this.props.loading) {
			return (
				<div>
					<FontAwesomeIcon
						color="lightgreen"
						icon={faSync}
						spin
						size="8x"
					/>;
				</div>
			);
		}
	}
}

const mapStateToProps = state => state;

export default connect(mapStateToProps, {
	get_user,
	new_product,
	logout,
	get_products
})(Dashboard);
