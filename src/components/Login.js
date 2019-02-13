import React, { Component } from 'react';
import { connect } from 'react-redux';
import { login } from '../ducks/reducer';
import { Link, Redirect } from 'react-router-dom';

class Login extends Component {
	constructor(props) {
		super(props);
		this.state = {
			username: '',
			password: ''
		};
	}

	handleChange = e => {
		this.setState({ [e.target.name]: e.target.value });
	};

	handleSubmit = e => {
		e.preventDefault();
		this.props.login(this.state.username, this.state.password);
	};

	render() {
		// console.log(this.props.user);
		if (this.props.user.username) {
			return <Redirect push to="/dashboard" />;
		}
		return (
			<div>
				<form onSubmit={this.handleSubmit}>
					<input
						value={this.state.username}
						type="username"
						name="username"
						placeholder=" username"
						onChange={e => this.handleChange(e)}
						required
					/>
					<input
						value={this.state.password}
						type="password"
						name="password"
						placeholder=" password"
						onChange={e => this.handleChange(e)}
						required
					/>

					<button>Login</button>
				</form>

				<p>
					No login?
					<Link to="/Register"> Register Here!</Link>
				</p>
			</div>
		);
	}
}

const mapStateToProps = state => {
	return {
		user: state.user
	};
};

export default connect(mapStateToProps, { login: login })(Login);
