import axios from 'axios';
const initialState = {
	loggedIn: false,
	loading: false
};

//action types
const PURCHASE_CONFIRMATION = 'PURCHASE_CONFIRMATION';

//action creators
export function purchase_confirmation(address, paymentID) {
	return {
		type: PURCHASE_CONFIRMATION,
		payload: axios.post('/api/paypal/confirmation', {
			address,
			paymentID
		})
	};
}
//export default function of each action type/creators
export default function reducer(state = initialState, action) {
	switch (action.type) {
		case `${PURCHASE_CONFIRMATION}_PENDING`:
			return { ...state, loading: true };
		case `${PURCHASE_CONFIRMATION}_FULFILLED`:
			return {
				...state,
				loading: false
			};
		case `${PURCHASE_CONFIRMATION}_REJECTED`:
			return { ...state, error: 'Purchase failed' };

		default:
			return state;
	}
}
