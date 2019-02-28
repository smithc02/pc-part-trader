import React, { Component } from 'react';
import { connect } from 'react-redux';
import { get_user, update_product } from '../../ducks/reducer';
import Modal from 'react-modal';
import './updateProducts.css';
Modal.setAppElement('#root');

class UpdateProducts extends Component {
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
	}
	handleUpdate = e => {
		console.log('props.id', this.props.id);
		e.preventDefault();
		// console.log('handle update', id, e);
		let { product_name, info, product_type, img_url } = this.state;
		this.props.update_product(this.props.id, {
			product_name,
			info,
			product_type,
			img_url
		});
		this.setState({
			product_name: '',
			info: '',
			product_type: '',
			img_url: ''
		});
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
		return (
			<div>
				<button
					className="update-product-modal-open"
					onClick={this.handleOpenModal}>
					Update Product
				</button>
				<Modal
					className="update-product-modal"
					isOpen={this.state.showModal}
					contentLabel="Update Modal"
					onRequestClose={this.handleCloseModal}>
					<form
						className="update-product-modal-form"
						onSubmit={e => this.handleUpdate(e)}>
						<div>
							<input
								className="update-product-name"
								maxLength="30"
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
								className="update-product-info"
								maxLength="36"
								value={this.state.info}
								type="text"
								placeholder="Product Info"
								onChange={e =>
									this.setState({
										info: e.target.value
									})}
							/>
						</div>

						<div>
							<input
								className="update-product-url"
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
								className="update-product-modal-select"
								onChange={e => this.listHandle(e.target.value)}>
								<option value=""> Please Select</option>
								<option value="CPU">CPU</option>
								<option value="Motherboard">Motherboard</option>
								<option value="RAMM">RAMM</option>
								<option value="GPU">GPU</option>
								<option value="HardDrive">HardDrive</option>
								<option value="Monitor">Monitor</option>
							</select>
						</div>
						<div>
							<button className="update-products-list-button">
								Update
							</button>
						</div>
					</form>
				</Modal>
				<div />
			</div>
		);
	}
}
const mapStateToProps = state => state;

export default connect(mapStateToProps, { get_user, update_product })(
	UpdateProducts
);
