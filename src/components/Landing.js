import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { get_user } from '../ducks/reducer';
import './landing.css';
// import io from 'socket.io-client';

class Landing extends Component {
	constructor(props) {
		super(props);
		this.state = {
			products: []
			// socket: io()
		};
	}

	componentDidMount() {
		this.props.get_user();
		// this.state.socket.on('connect', () => {
		// 	console.log('Hello, im connected');
		// });
	}
	render() {
		if (this.props.user.username) {
			return (
				<div>
					<div className="landing">
						<header className="navBar">
							<div className="loginLink">
								<div>
									<Link to="/dashboard">User Dashboard </Link>
								</div>
							</div>
						</header>
						<div>ABOUT US</div>
					</div>
				</div>
			);
		} else {
			return (
				<div>
					<div className="landing">
						<header className="navBar">
							<div className="loginLink">
								<Link to="/register">Register</Link>
							</div>

							<div className="registerLink">
								<Link to="/login">Login</Link>
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
