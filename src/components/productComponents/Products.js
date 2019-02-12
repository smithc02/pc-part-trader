import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import { get_user } from '../../ducks/reducer';

class Products extends Component {
	constructor(props) {
		super(props);
		this.state = {
			products: []
		};
	}

	componentDidMount() {
		axios.get('/api/product').then(res => {
			this.setState({ products: res.data });
		});
		get_user();
	}

	render() {
		if(this.props.user.role === 'Buyer')
		return (
			<div className="product_container">
				<div>
					<div>
						{this.props.product_name}
					</div>
					<div>
						{this.props.info}
					</div>
					<div>
						{this.props.product_type}
					</div>
				</div>
			</div>
		);
	}
}

const mapStateToProps = state => state;

export default connect(mapStateToProps, { get_user })(Products);
