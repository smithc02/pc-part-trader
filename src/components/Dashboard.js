import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { get_user } from '../ducks/reducer';
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
						? <div>
								<BuyerProducts />
							</div>
						: <div>
								<SellerProducts />
							</div>}
				</div>
			);
		} else {
			return (
				<div>
					<h1>You are not logged in!</h1>
					<Link to="/login">Login</Link>
				</div>
			);
		}
	}
}

const mapStateToProps = state => state;

export default connect(mapStateToProps, {
	get_user
})(Dashboard);
