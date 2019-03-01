import React, { Component } from 'react';
import Slider from 'react-slick';
import { connect } from 'react-redux';
import { get_products, get_user } from '../ducks/reducer';
import './carousel.css';

class Carousel extends Component {
	componentDidMount() {
		this.props.get_user();
		this.props.get_products();
	}

	render() {
		const settings = {
			dots: true,
			infinite: true,
			speed: 500,
			slidesToShow: 1,
			slidesToScroll: 1,
			arrows: true
		};
		let productDisplay = this.props.products.map((product, i) => {
			console.log(this.props.products);
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
