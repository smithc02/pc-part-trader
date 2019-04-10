import { combineReducers, createStore, applyMiddleware, compose } from 'redux';
import promise from 'redux-promise-middleware';
import pR from './paypalReducer';
import prodR from './productReducer';
import uR from './userReducer';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = combineReducers({
	pR,
	prodR,
	uR
});
export default createStore(store, composeEnhancers(applyMiddleware(promise)));
