import axios from 'axios';
const initialState = {
	products: [],
	userProducts: [],
	user: {},
	error: '',
	loggedIn: false,
	loading: false
};

//action types
const GET_USER = 'GET_USER';
const LOGIN = 'LOGIN';
const REGISTER = 'REGISTER';
const GET_PRODUCTS = 'GET_PRODUCTS';
const NEW_PRODUCT = 'NEW_PRODUCT';
const LOGOUT = 'LOGOUT';
const GET_USER_PRODUCT = 'GET_USER_PRODUCT';
const DELETE_PRODUCT = 'DELETE_PRODUCT';
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

export function get_products() {
	return {
		type: GET_PRODUCTS,
		payload: axios.get('/api/product')
	};
}

export function new_product(
	product_name,
	info,
	product_type,
	user_id,
	img_url
) {
	return {
		type: NEW_PRODUCT,
		payload: axios.post('/api/user/newproduct', {
			product_name,
			info,
			product_type,
			user_id,
			img_url
		})
	};
}
export function get_user_product() {
	return {
		type: GET_USER_PRODUCT,
		payload: axios.get('/api/user/userproduct', {})
	};
}
export function delete_product(id) {
	return {
		type: DELETE_PRODUCT,
		payload: axios.post(`/api/user/removeproduct/${id}`)
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
				loggedIn: true,

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

		case `${GET_PRODUCTS}_PENDING`:
			return { ...state, loading: true };
		case `${GET_PRODUCTS}_FULFILLED`:
			return { ...state, products: action.payload.data, loading: false };
		case `${GET_PRODUCTS}_REJECTED`:
			return { ...state, error: 'Get_products was not successfull' };

		case `${NEW_PRODUCT}_PENDING`:
			return { ...state, loading: true };
		case `${NEW_PRODUCT}_FULFILLED`:
			return { ...state, products: action.payload.data, loading: false };
		case `${NEW_PRODUCT}_REJECTED`:
			return { ...state, error: 'new_product was not successfull' };

		case `${GET_USER_PRODUCT}_PENDING`:
			return {
				...state,

				loading: true
			};
		case `${GET_USER_PRODUCT}_FULFILLED`:
			return {
				...state,

				userProducts: action.payload.data,
				loading: false
			};
		case `${GET_USER_PRODUCT}_REJECTED`:
			return { ...state, error: 'new_product was not successfull' };

		case `${DELETE_PRODUCT}_PENDING`:
			return { ...state, loading: true };
		case `${DELETE_PRODUCT}_FULFILLED`:
			return { ...state, products: action.payload.data, loading: false };
		case `${DELETE_PRODUCT}_REJECTED`:
			return { ...state, error: 'Delete_product attempt failed.' };

		default:
			return state;
	}
}
