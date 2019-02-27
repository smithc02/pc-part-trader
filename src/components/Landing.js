import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { get_user } from '../ducks/reducer';
import './landing.css';


class Landing extends Component {
	constructor(props) {
		super(props);
		this.state = {
			products: []
		};
	}

	componentDidMount() {
		this.props.get_user();
	}
	render() {
		if (this.props.user.username) {
			return (
				<div className="landing-background">
					<div className="landing">
						<header className="navBar">
							<div>
								<h1 className="landing-page-name">
									PcPartsTraders
								</h1>
							</div>
							<div className="loginLink">
								<div className="landing-dashboard-box">
									<Link
										className="user-dashboard-link"
										to="/dashboard">
										User Dashboard
									</Link>
								</div>
							</div>
						</header>
						<div className="landing-info-holder">
							<h1 className="landing-info-box">
								{' '}Welcome to the future of PC parts!
							</h1>
						</div>
					</div>
				</div>
			);
		} else {
			return (
				<div className="landing-background">
					<div className="landing">
						<header className="navBar">
							<div>
								<h1 className="landing-page-name">
									PcPartsTraders
								</h1>
							</div>
							<div className="landing-link-box">
								<Link className="login-link" to="/login">
									Login
								</Link>
								<Link className="register-link" to="/register">
									Register
								</Link>
							</div>
						</header>
						<div className="landing-info-holder">
							<h1 className="landing-info-box">
							Welcome to the Future of PC parts!
							</h1>
						</div>
						<div className="landing-products">
							{/* <LandingProducts /> */}
						</div>
					</div>
				</div>
			);
		}
	}
}

const mapStateToProps = state => state;

export default connect(mapStateToProps, {
	get_user
})(Landing);
