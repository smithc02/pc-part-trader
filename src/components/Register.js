import React, { Component } from 'react';
import { connect } from 'react-redux';
import { register } from '../ducks/reducer';
import Modal from 'react-modal';
import { Link, Redirect } from 'react-router-dom';
import './register.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';
Modal.setAppElement('#root');

class Register extends Component {
	constructor(props) {
		super(props);
		this.state = {
			username: '',
			password: '',
			email: '',
			img_url: '',
			role: '',
			showModal: false,
			registered: false
		};
	}

	handleOpenModal = () => {
		this.setState({ showModal: true });
	};

	handleCloseModal = () => {
		this.setState({ showModal: false });
	};

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
			role: '',
			registered: true
		});
	};

	listHandle(value) {
		console.log(value);
		this.setState({
			role: value
		});
	}

	render() {
		if (this.state.registered === false) {
			return (
				<div>
					<button
						className="register-button"
						onClick={this.handleOpenModal}>
						Register
					</button>

					<Modal
						className="register-modal"
						isOpen={this.state.showModal}
						contentLabel="Register Modal"
						onRequestClose={this.handleCloseModal}>
						<form
							className="register-input-form"
							onSubmit={this.handleSubmit}>
							<div>
								<div>
									<FontAwesomeIcon icon={faUser} size="5x" />
								</div>
								<div>
									<h1 className="modal-title" >REGISTER</h1>
								</div>
								<input
									className="register-modal-username"
									value={this.state.username}
									type="username"
									name="username"
									placeholder=" username"
									onChange={this.handleChange}
								/>
							</div>
							<div>
								<input
									className="register-modal-password"
									value={this.state.password}
									type="password"
									name="password"
									placeholder=" password"
									onChange={this.handleChange}
								/>
							</div>
							<div>
								<input
									className="register-modal-email"
									value={this.state.email}
									type="email"
									name="email"
									placeholder="email"
									onChange={this.handleChange}
								/>
							</div>
							<div>
								<input
									className="register-modal-img"
									value={this.state.img_url}
									type="img_url"
									name="img_url"
									placeholder="img_url"
									onChange={this.handleChange}
								/>
							</div>
							<div>
								<select
									className="register-select"
									onChange={e =>
										this.listHandle(e.target.value)}>
									<option value=""> Please Select</option>
									<option value="Buyer">Buyer</option>
									<option value="Seller">Seller</option>
								</select>
							</div>
							<div>
								<input
									className="register-button-modal"
									type="submit"
									value="Register"
								/>
							</div>
						</form>
					</Modal>
					<div>
						<h3>Already registered?</h3>
						<Link to="/login">Login</Link>
					</div>
				</div>
			);
		} else {
			return (
				<div>
					<Redirect push to="/login" />
				</div>
			);
		}
	}
}
const mapStateToProps = state => {
	return {
		user: state.user
	};
};

export default connect(mapStateToProps, { register: register })(Register);