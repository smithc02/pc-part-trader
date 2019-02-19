import React, { Component } from 'react';
import { connect } from 'react-redux';
import { get_user, get_products } from '../../ducks/reducer';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSync } from '@fortawesome/free-solid-svg-icons';
import { Link, Redirect } from 'react-router-dom';


class SellerSpecific extends Component {
	constructor(props) {
		super(props);
		this.state = {
			products: []
		};
	}
	componentDidMount() {
		this.props.get_user();
		console.log('seller specific user', this.props.user);
		this.props.get_products();
		console.log('seller specific state', this.state.products);
	}

	render() {
		let sellerSpecific = this.props.products.map((product, i) => {
			return <div />;
		});
		return (
			<div className="seller-specific-container">
				<Link to="/dashboard"> Dashboard</Link>
			</div>
		);
	}
}
const mapStateToProps = state => state;

export default connect(mapStateToProps, { get_user, get_products })(
	SellerSpecific
);
