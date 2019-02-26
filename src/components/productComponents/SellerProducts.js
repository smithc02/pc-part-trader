import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
	get_user,
	get_products,
	logout,
	new_product
} from '../../ducks/reducer';
import './sellerProducts.css';
import Modal from 'react-modal';

Modal.setAppElement('#root');

class SellerProducts extends Component {
	constructor(props) {
		super(props);
		this.state = {
			product_name: '',
			info: '',
			product_type: '',
			img_url: '',
			showModal: false
		};
	}
	componentDidMount() {
		this.props.get_user();
		this.props.get_products();
	}

	componentDidUpdate(prevProps) {
		// console.log('componentDidUpdate');

		if (prevProps.products.length !== this.props.products.length) {
			this.props.get_products();
		}
		// console.log(this.state.products);
	}

	handleSubmit = e => {
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
		this.props.get_products();
		this.setState({ showModal: false });
	};

	handleOpenModal = () => {
		this.setState({ showModal: true });
	};

	handleCloseModal = () => {
		this.setState({ showModal: false });
	};

	listHandle(value) {
		this.setState({
			product_type: value
		});
	}

	render() {
		// console.log(this.props.products);
		// if (this.props.products.length > 0) {
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
				</div>
			);
		});

		return (
			<div>
				<div>
					<div>
						<div className="dashboard-products-button-container">
							<a href="/sellerspecific">
								<button className="dashboard-myproducts-button">
									My Products
								</button>
							</a>
						</div>
					</div>
					<div className="dashboard-products-username-container">
						<h1 className="dashboard-username">
							{this.props.user.username}: Seller
						</h1>
					</div>
					<div className="dashboard-logout-button-container">
						<form action="/login">
							<button
								className="dashboard-logout-button"
								onClick={() => this.props.logout()}>
								Logout
							</button>
						</form>
					</div>
					<div className="parts-for-sale-container">
						<h1> All parts for sale!</h1>
					</div>
				</div>

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
									placeholder="Img_url"
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
										this.listHandle(e.target.value)}>
									<option value=""> Please Select</option>
									<option value="CPU">CPU</option>
									<option value="Motherboard">
										Motherboard
									</option>
									<option value="RAMM">RAMM</option>
									<option value="GPU">GPU</option>
									<option value="HardDrive">HardDrive</option>
									<option value="Monitor">Monitor</option>
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
		);
	}
	// }
}

const mapStateToProps = state => {
	// console.log(state);
	return state;
};
export default connect(mapStateToProps, {
	get_user,
	get_products,
	logout,
	new_product
})(SellerProducts);
