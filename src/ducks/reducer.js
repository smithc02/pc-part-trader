import axios from 'axios';
const initialState = {
	user: {},
	error: ''
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
		type: LOGIN,
		payload: axios.post('/api/register', {
			username,
			password,
			email,
			img_url,
			role
		})
	};
}

//export dfault function of each action type/creators
export default function reducer(state = initialState, action) {
	switch (action.type) {
		case `${GET_USER}_FULFILLED`:
			return { ...state, user: action.payload.data };

		case `${LOGIN}_FULFILLED`:
			return { ...state, user: action.payload.data };
		case `${LOGIN}_REJECTED`:
			return { ...state, error: 'Username or password is incorrect ' };

		case `${REGISTER}_FULFILLED`:
			return { ...state, user: action.payload.data };
		case `${REGISTER}_REJECTED`:
			return { ...state, error: 'Registeration was not successfull' };

		default:
			return state;
	}
}
