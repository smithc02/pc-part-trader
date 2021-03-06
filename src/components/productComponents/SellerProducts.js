import React, { Component } from 'react';
import { connect } from 'react-redux';
import { get_user, logout } from '../../ducks/userReducer';
import { get_products, new_product } from '../../ducks/productReducer';
import './sellerProducts.css';
import Slider from 'react-slick';
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
			price: '',
			showModal: false
		};
	}
	componentDidMount() {
		this.props.get_user();
		this.props.get_products();
	}
	componentDidUpdate(prevProps) {
		if (
			prevProps.prodR.products.length !== this.props.prodR.products.length
		) {
			this.props.get_products();
		}
	}
	handleSubmit = e => {
		e.preventDefault();
		this.props.new_product(
			this.state.product_name,
			this.state.info,
			this.state.product_type,
			this.state.img_url,
			this.state.price
		);
		this.setState({
			product_name: '',
			info: '',
			product_type: '',
			img_url: '',
			price: ''
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
		const settings = {
			dots: false,
			infinite: true,
			speed: 500,
			slidesToShow: 1,
			slidesToScroll: 1,
			arrows: true
		};
		let productDisplay = this.props.prodR.products.map((product, i) => {
			return (
				<div className="seller-product-map" key={product.id}>
					<div className="seller-product-just-another-container">
						<div className="seller-product-img-container">
							<div className="seller-product-img-sizing">
								<Slider {...settings}>
									<div>
										<img
											className="picture"
											src={product.img_url}
											alt=""
										/>
									</div>
									<div>
										<img
											className="picture"
											src={product.img_url2}
											alt=""
										/>
									</div>
									<div>
										<img
											className="picture"
											src={product.img_url3}
											alt=""
										/>
									</div>
								</Slider>
							</div>
						</div>
					</div>
					<div className="seller-text-product-container">
						<div className="seller-product-price">
							{product.price}
						</div>
						<div className="seller-product-name">
							{product.product_name}
						</div>
						<div className="seller-product-info">
							{product.info}
						</div>
						<div className="seller-product-type">
							{product.product_type}
						</div>
					</div>
				</div>
			);
		});
		return (
			<div>
				<div>
					<div>
						<button
							className="seller-modal-open"
							onClick={this.handleOpenModal}>
							{' '}Register a new product
						</button>
					</div>
					<Modal
						className="seller-modal"
						isOpen={this.state.showModal}
						contentLabel="Login Modal"
						onRequestClose={this.handleCloseModal}>
						<form
							className="seller-modal-form"
							onSubmit={this.handleSubmit}>
							<div>
								<input
									className="seller-product-name-modal"
									maxLength="36"
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
									className="seller-product-info-modal"
									maxLength="60"
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
									className="seller-product-img-modal"
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
								<input
									className="seller-product-price-modal"
									value={this.state.price}
									type="money"
									placeholder="Price"
									onChange={e =>
										this.setState({
											price: e.target.value
										})}
								/>
							</div>
							<div>
								<select
									className="seller-modal-select-modal"
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
								<button className="seller-list-item-button">
									List Item
								</button>
							</div>
						</form>
					</Modal>
					<div className="seller-product-product-display">
						{productDisplay}
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
	logout,
	new_product
})(SellerProducts);
