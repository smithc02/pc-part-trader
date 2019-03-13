import axios from 'axios';
const initialState = {
	user: {},
	loggedIn: false,
	loading: false
};

//action types
const GET_USER = 'GET_USER';
const LOGIN = 'LOGIN';
const REGISTER = 'REGISTER';

//action creators
export function get_user() {
	return {
		type: GET_USER,
		payload: axios.get('/api/user')
	};
}
export function login(username, password) {
	return {
		type: LOGIN,
		payload: axios.post('/api/login', { username, password })
	};
}

export function register(username, password, email, img_url, role) {
	return {
		type: REGISTER,
		payload: axios.post('/api/register', {
			username,
			password,
			email,
			img_url,
			role
		})
	};
}
export function logout() {
	return {
		type: LOGOUT,
		payload: axios.get('/api/logout')
	};
}

//export default function of each action type/creators
export default function reducer(state = initialState, action) {
	switch (action.type) {
		case `${GET_USER}_PENDING`:
			return { ...state, loading: true };
		case `${GET_USER}_FULFILLED`:
			return { ...state, user: action.payload.data, loading: false };
		case `${GET_USER}_REJECTED`:
			return { ...state, error: 'incorrect username or password' };

		case `${LOGIN}_PENDING`:
			return {
				...state,
				loggedIn: false,

				loading: true
			};
		case `${LOGIN}_FULFILLED`:
			return {
				...state,
				loggedIn: true,
				user: action.payload.data,
				loading: false
			};
		case `${LOGIN}_REJECTED`:
			return { ...state, error: 'Username or password is incorrect ' };

		case `${LOGOUT}_FULFILLED`:
			console.log('logout has been triggered');
			return { ...state, loggedIn: false };

		case `${REGISTER}_PENDING`:
			return { ...state, loading: true };
		case `${REGISTER}_FULFILLED`:
			return { ...state, user: action.payload.data, loading: false };
		case `${REGISTER}_REJECTED`:
			alert('Email has already been taken, please try again');
			return { ...state, error: 'Registration was not successfull' };

		default:
			return state;
	}
}
