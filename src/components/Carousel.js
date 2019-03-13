import React, { Component } from 'react';
import Slider from 'react-slick';
import { connect } from 'react-redux';
import { get_user } from '../ducks/userReducer';
import { get_products } from '../ducks/productReducer';
import './carousel.css';

class Carousel extends Component {
	componentDidMount() {
		this.props.uR.get_user();
		this.props.prodR.get_products();
	}

	render() {
		const settings = {
			dots: false,
			infinite: true,
			speed: 500,
			slidesToShow: 1,
			slidesToScroll: 1,
			arrows: true
		};
		let productDisplay = this.props.prodR.products.map((product, i) => {
			console.log(this.props.prodR.products);
			return (
				<div key={i} className="c-container">
					<div className="c-another-container">
						<Slider {...settings}>
							<div>
								<img
									className="picture"
									src={product.img_url}
									alt=""
								/>
							</div>
							<div>
								<img
									className="picture"
									src={product.img_url2}
									alt=""
								/>
							</div>
							<div>
								<img
									className="picture"
									src={product.img_url3}
									alt=""
								/>
							</div>
						</Slider>
					</div>
				</div>
			);
		});
		return (
			<div className="c-whole-page">
				<div className="c-display-sizing">
					<div className="c-display-div">
						{productDisplay}
					</div>
				</div>
			</div>
		);
	}
}

const mapStateToProps = state => state;

export default connect(mapStateToProps, {
	get_products,
	get_user
})(Carousel);
