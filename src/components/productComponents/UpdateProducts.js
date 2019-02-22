import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
	get_user,
	get_products,
	get_user_product,
	delete_product
} from '../../ducks/reducer';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faSync } from '@fortawesome/free-solid-svg-icons';
import './sellerSpecific.css';

class UpdateProducts extends Component {
	constructor(props) {
		super(props);
		this.state = {
			product_name: '',
			info: '',
			product_type: '',
			img_url: ''
		};
	}

	render() {
		return <div>Hi</div>;
	}
}
const mapStateToProps = state => state;

export default connect(mapStateToProps)(UpdateProducts);
