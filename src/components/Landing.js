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
				<Link to="/login">Login</Link>
			</div>
		);
	}
}

export default Landing;
