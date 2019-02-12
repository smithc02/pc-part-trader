import React from 'react';
import { Switch, Route } from 'react-router-dom';

import Login from './components/Login';
import Register from './components/Register';
import Dashboard from './components/Dashboard';
import Landing from './components/Landing';
export default (
	<Switch>
		<Route exact path="/" component={Landing} />
		<Route path="/dashboard" component={Dashboard} />
		<Route path="/register" component={Register} />
		<Route path="/login" component={Login} />
	</Switch>
);
