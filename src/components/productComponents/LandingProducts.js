import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { buyer_product } from '../../ducks/productReducer';
import { get_user } from '../../ducks/userReducer';
import './landingproducts.css';
class LandingProducts extends Component {
	constructor(props) {
		super(props);
		this.state = {};
	}

	componentDidMount() {
		this.props.uR.get_user();
		this.props.prodR.buyer_product();
	}

	render() {
		if (this.props.buyerProduct.length !== 0) {
			let productDisplay = this.props.propR.buyerProduct.map(
				(product, i) => {
					return (
						<div className="lp-whole-container" key={product.id}>
							<div>
								<div className="landing-products-img-sizing">
									<img
										className="lp-img"
										src={product.img_url}
										alt="product"
									/>
								</div>
							</div>
							<div className="lp-text-container">
								<div className="lp-name">
									{product.product_name}
								</div>

								<div className="lp-username">
									Username: {product.username}
								</div>

								<div className="lp-info">
									{product.info}
								</div>
								<div className="lp-userid">
									{product.user_id}
								</div>
							</div>
						</div>
					);
				}
			);
			return (
				<div>
					<div>
						<header className="secret-nav-container">
							<nav className="lp-navbar">
								<h1 className="lp-secret">SECRET PAGE</h1>
								<Link className="secret-home-link" to="/">
									Home
								</Link>
							</nav>
						</header>
					</div>
					<div className="lp-product-display">
						{productDisplay}
					</div>
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
