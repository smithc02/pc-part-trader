import React, { Component } from 'react';
import { connect } from 'react-redux';
import { login } from '../ducks/reducer';
import { Redirect } from 'react-router-dom';
import Modal from 'react-modal';
import './login.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';
Modal.setAppElement('#root');

class Login extends Component {
	constructor(props) {
		super(props);
		this.state = {
			username: '',
			password: '',
			showModal: true,
			secretMenu: false
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
		this.props.login(this.state.username, this.state.password);
	};
	showMenu = () => {
		this.setState({ secretMenu: !this.state.secretMenu });
	};

	render() {
		// console.log(this.props.user);
		if (this.props.user.username) {
			return <Redirect push to="/dashboard" />;
		}
		if (this.state.showModal === true) {
			return (
				<div className="style">
					<div>
						<Modal
							className="modal"
							isOpen={this.state.showModal}
							contentLabel="Login Modal"
							onRequestClose={this.handleCloseModal}>
							<form
								className="login-input-form"
								onSubmit={this.handleSubmit}>
								<div className="modal-form-container">
									<div>
										<FontAwesomeIcon
											className="-login-person-icon"
											icon={faUser}
											size="5x"
										/>
									</div>
									<div>
										<h1 className="login-modal-title">
											LOGIN
										</h1>
									</div>
									<div>
										<input
											className="username-modal-input"
											value={this.state.username}
											type="username"
											name="username"
											placeholder=" Username"
											onChange={e => this.handleChange(e)}
											required
										/>
									</div>
									<div>
										<div className="password-modal-container">
											<input
												className="password-modal-input"
												value={this.state.password}
												type="password"
												name="password"
												placeholder=" Password"
												onChange={e =>
													this.handleChange(e)}
												required
											/>
										</div>
										<div>
											<input
												className="login-button"
												type="submit"
												value="Login"
											/>
										</div>
									</div>
								</div>
							</form>
						</Modal>
					</div>
				</div>
			);
		}
		return (
			<div className="login">
				<Redirect to="/" />
			</div>
		);
	}
}

const mapStateToProps = state => {
	return {
		user: state.user
	};
};

export default connect(mapStateToProps, { login })(Login);
