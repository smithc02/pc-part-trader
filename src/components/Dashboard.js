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
						? <div className="dashboard-landing">
								<header className="dashboard-navBar">
									<div>
										<h1 className="dashboard-username-container">
											{this.props.user.username}
										</h1>
									</div>
									<div className="dashboard-link-login-box">
										<div className="homeLink">
											<div className="dashboard-home-link-box">
												<Link
													className="dashboard-home-link"
													to="/">
													Home
												</Link>
											</div>
										</div>
										<div>
											<form action="/login">
												<button
													className="dashboard-logout-button"
													onClick={() =>
														this.props.logout()}>
													Logout
												</button>
											</form>
										</div>
									</div>
								</header>
								<div>
									<BuyerProducts />
								</div>
							</div>
						: <div>
								<header className="dashboard-navBar">
									<div className="dashboard-products-username-container">
										<h1 className="dashboard-username">
											{this.props.user.username}: Seller
										</h1>
									</div>
									<div className="dashboard-stuff-container">
										<div className="dashboard-home-link-box">
											<Link
												className="dashboard-home-link"
												to="/">
												{' '}Home{' '}
											</Link>
										</div>
										<div className="dashboard-products-button-container">
											<a href="/sellerspecific">
												<button className="dashboard-myproducts-button">
													My Products
												</button>
											</a>
										</div>

										<div className="dashboard-logout-button-container">
											<form action="/login">
												<button
													className="dashboard-logout-button"
													onClick={() =>
														this.props.logout()}>
													Logout
												</button>
											</form>
										</div>
									</div>
								</header>

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
