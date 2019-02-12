import React, { Component } from 'react';
import { connect } from 'react-redux';
import { register } from '../ducks/reducer';

import { Link } from 'react-router-dom';

class Register extends Component {
	constructor(props) {
		super(props);
		this.state = {
			username: '',
			password: '',
			email: '',
			img_url: '',
			role: ''
		};
	}

	handleChange = e => {
		this.setState({ [e.target.name]: e.target.value });
	};

	handleSubmit = e => {
		e.preventDefault();
		this.props.register(
			this.state.username,
			this.state.password,
			this.state.email,
			this.state.img_url,
			this.state.role
		);

		this.setState({
			username: '',
			password: '',
			email: '',
			img_url: '',
			role: ''
		});
	};

	listHandle(value) {
		console.log(value);
		this.setState({
			role: value
		});
	}

	render() {
		return (
			<div>
				<form onSubmit={this.handleSubmit}>
					<input
						value={this.state.username}
						type="username"
						name="username"
						placeholder=" username"
						onChange={this.handleChange}
					/>
					<input
						value={this.state.password}
						type="password"
						name="password"
						placeholder=" password"
						onChange={this.handleChange}
					/>
					<input
						value={this.state.email}
						type="email"
						name="email"
						placeholder="email"
						onChange={this.handleChange}
					/>
					<input
						value={this.state.img_url}
						type="img_url"
						name="img_url"
						placeholder="img_url"
						onChange={this.handleChange}
					/>

					<select onChange={e => this.listHandle(e.target.value)}>
						<option value=""> Please Select</option>
						<option value="Buyer">Buyer</option>
						<option value="Seller">Seller</option>
					</select>

					<button>Register</button>
				</form>
				<div>
					<h3>Already registered?</h3>
					<Link to="/login">Login</Link>
				</div>
			</div>
		);
	}
}
const mapStateToProps = state => {
	return {
		user: state.user
	};
};

export default connect(mapStateToProps, { register: register })(Register);
