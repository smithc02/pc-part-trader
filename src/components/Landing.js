import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './landing.css';
// import axios from 'axios';

class Landing extends Component {
	constructor(props) {
		super(props);
		this.state = {
			products: []
		};
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
