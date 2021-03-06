import axios from 'axios';
const initialState = {
	products: [],
	userProducts: [],
	product_name: '',
	info: '',
	product_type: '',
	img_url: '',
	error: '',
	loggedIn: false,
	loading: false,
	buyerProduct: []
};
//action types
const GET_PRODUCTS = 'GET_PRODUCTS';
const NEW_PRODUCT = 'NEW_PRODUCT';
const GET_USER_PRODUCT = 'GET_USER_PRODUCT';
const DELETE_PRODUCT = 'DELETE_PRODUCT';
const BUYER_PRODUCT = 'BUYER_PRODUCTS';
const UPDATE_PRODUCT = 'UPDATE_PRODUCT';

//action creators
export function get_products() {
	// console.log('hit');
	return {
		type: GET_PRODUCTS,
		payload: axios.get('/api/product')
	};
}
export function new_product(product_name, info, product_type, img_url, price) {
	return {
		type: NEW_PRODUCT,
		payload: axios.post('/api/user/newproduct', {
			product_name,
			info,
			product_type,
			img_url,
			price
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
		payload: axios.delete(`/api/user/removeproduct/${id}`)
	};
}
export function buyer_product() {
	return {
		type: BUYER_PRODUCT,
		payload: axios.get('/api/user/productbuyer')
	};
}
export function update_product(id, content) {
	return {
		type: UPDATE_PRODUCT,
		payload: axios.put(`/api/user/updateproduct/${id}`, {
			product_name: content.product_name,
			info: content.info,
			product_type: content.product_type,
			img_url: content.img_url
		})
	};
}
//export default function of each action type/creators
export default function reducerr(state = initialState, action) {
	switch (action.type) {
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
		case `${BUYER_PRODUCT}_PENDING`:
			return { ...state, loading: true };
		case `${BUYER_PRODUCT}_FULFILLED`:
			return {
				...state,
				buyerProduct: action.payload.data,
				loading: false
			};
		case `${BUYER_PRODUCT}_REJECTED`:
			return { ...state, error: 'Buyer_product attempt failed.' };

		case `${UPDATE_PRODUCT}_PENDING`:
			return { ...state, loading: true };
		case `${UPDATE_PRODUCT}_FULFILLED`:
			return {
				...state,
				userProducts: action.payload.data,
				loading: false
			};
		case `${UPDATE_PRODUCT}_REJECTED`:
			return { ...state, error: 'Update_product attempt failed.' };

		default:
			return state;
	}
}
