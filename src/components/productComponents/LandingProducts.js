import React, { Component } from 'react';
import { connect } from 'react-redux';
import { buyer_product, get_user } from '../../ducks/reducer';

class LandingProducts extends Component {
	constructor(props) {
		super(props);
		this.state = {};
	}

	componentDidMount() {
		this.props.get_user();
		this.props.buyer_product();
	}

	render() {
		if (this.props.buyerProduct.length !== 0) {
			let productDisplay = this.props.buyerProduct.map((product, i) => {
				return (
					<div key={product.id}>
						<div className='lp-name'>
							{product.product_name}
						</div>

						<div className='lp-username'>
							{product.username}
						</div>
						<div>
							{product.info}
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
					{productDisplay}
				</div>
			);
		} else {
			return <div />;
		}
	}
}
const mapStateToProps = state => {
	return state;
};
export default connect(mapStateToProps, { buyer_product, get_user })(
	LandingProducts
);
