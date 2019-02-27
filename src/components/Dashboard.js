import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { get_user, logout } from '../ducks/reducer';
import BuyerProducts from './productComponents/BuyerProducts';
import SellerProducts from './productComponents/SellerProducts';
import './dashboard.css';
import Modal from 'react-modal';
Modal.setAppElement('#root');

class Dashboard extends Component {
	constructor() {
		super();
		this.state = {
			showModal: false
		};
	}
	componentDidMount() {
		this.props.get_user();
	}
	render() {
		if (this.props.user.username) {
			return (
				<div>
					{' '}{this.props.user.role === 'Buyer'
						? <div className="dashboard">
								<div className="dashboard-buyer-display">
									<h1 className="buyer-product-username-container">
										<div className="buyer-products-username">
											{this.props.user.username}: Buyer
										</div>
									</h1>

									<div className="buyer-product-user-home-container">
										<div className="buyer-product-home-link-container">
											<Link
												className="dashboard-home-link2"
												to="/">
												Home
											</Link>
										</div>
										<div>
											<form action="/login">
												<button
													className="buyer-logout-button"
													onClick={() =>
														this.props.logout()}>
													Logout
												</button>
											</form>
										</div>
									</div>
								</div>
								<div>
									<BuyerProducts />
								</div>
							</div>
						: <div>
								<div>
									<div>
										<div className="seller-products-button-container">
											<a href="/sellerspecific">
												<button className="seller-myproducts-button">
													My Products
												</button>
											</a>
										</div>
									</div>
									<div className="seller-products-username-container">
										<h1 className="seller-username">
											{this.props.user.username}: Seller
										</h1>
									</div>
									<div className="seller-logout-button-container">
										<form action="/login">
											<button
												className="seller-logout-button"
												onClick={() =>
													this.props.logout()}>
												Logout
											</button>
										</form>
									</div>
									<div className="parts-for-sale-container">
										<h1> All parts for sale!</h1>
									</div>
								</div>
								<div>
									<Link to="/"> Home </Link>
								</div>
								<div>
									<SellerProducts />
								</div>
							</div>}
				</div>
			);
		} else {
			return (
				<div>
					<h1 className="dashboard-logged-out">
						You are not logged in!
					</h1>
					<Link className="dashboard-login-button" to="/login">
						Login
					</Link>
				</div>
			);
		}
	}
}

const mapStateToProps = state => state;

export default connect(mapStateToProps, {
	get_user,
	logout
})(Dashboard);
