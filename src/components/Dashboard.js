import React, { Component } from 'react';
import { connect } from 'react-redux';
import { get_user } from '../ducks/reducer';
import { Link } from 'react-router-dom';

class Dashboard extends Component {
	componentDidMount() {
		this.props.get_user();
	}
	render() {
		console.log(this.props.user);
		if (!this.props.user.username) {
			return <Link to="/login">Login</Link>;
		} else {
			return (
				<h1>
					{this.props.user.username}'s Account
					<br></br>
					<button>Logout</button>
				</h1>
			);
		}
	}
}

const mapStateToProps = state => state;

export default connect(mapStateToProps, { get_user })(Dashboard);
