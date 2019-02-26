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
							<div>PcPartsTraders</div>
							<div className="loginLink">
								<div>
									<Link
										className="user-dashboard-link"
										to="/dashboard">
										User Dashboard{' '}
									</Link>
								</div>
							</div>
						</header>
						<div>ABOUT US</div>
					</div>
				</div>
			);
		} else {
			return (
				<div className="landing-background">
					<div className="landing">
						<header className="navBar">
							<div>PcPartsTraders</div>
							<div className="landing-register-container">
								<Link className="register-link" to="/register">
									Register
								</Link>
							</div>
							<div className="landing-login-container">
								<Link className="login-link" to="/login">
									Login
								</Link>
							</div>
						</header>
						<div>ABOUT US</div>
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
