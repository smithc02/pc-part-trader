import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './landing.css';
import io from 'socket.io-client';

class Landing extends Component {
	constructor(props) {
		super(props);
		this.state = {
			products: [],
			socket: io()
		};
	}

	componentDidMount() {
		this.state.socket.on('connect', () => {
			console.log('Hello, im connected');
		});
	}
	render() {
		return (
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
		);
	}
}

export default Landing;
