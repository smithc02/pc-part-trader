import { combineReducers, createStore, applyMiddleware } from 'redux';
import promise from 'redux-promise-middleware';
import pR from './paypalReducer';
import prodR from './productReducer';
import uR from './userReducer';

const store = combineReducers({
	pR,
	prodR,
	uR
});
export default createStore(store, applyMiddleware(promise));
