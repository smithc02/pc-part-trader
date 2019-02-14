import React, { Component } from 'react';
import { connect } from 'react-redux';
// import axios from 'axios';
import { get_user, get_products } from '../../ducks/reducer';

class Products extends Component {
	// componentWillMount() {
	// 	this.props.get_user();
	// }

	render() {
		// console.log(this.props.products);
		if (this.props.user.role === 'Buyer') {
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
						<div>
							<img
								className="sellerProductImages"
								src={this.props.img_url}
								alt={this.props.product_type}
							/>
						</div>
					</div>
				</div>
			);
		} else {
			if (this.props.user.role === 'Seller') {
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
							<div>
								<img
									className="sellerProductImages"
									src={this.props.img_url}
									alt={this.props.product_type}
								/>
							</div>
						</div>
					</div>
				);
			}
		}
	}
}

const mapStateToProps = state => state;

export default connect(mapStateToProps, { get_user, get_products })(Products);
