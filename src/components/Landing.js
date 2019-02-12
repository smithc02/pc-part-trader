import React, { Component } from 'react';
import { Link } from 'react-router-dom';
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
			<div>
				<div>
					<Link to="/login">Login</Link>
				</div>
				<div>
					<Link to="/register">Register</Link>
				</div>
			</div>
		);
	}
}

export default Landing;
