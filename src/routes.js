import React from 'react';
import { Switch, Route } from 'react-router-dom';

import Login from './components/Login';
import Register from './components/Register';
import Dashboard from './components/Dashboard';
import Landing from './components/Landing';
import SellerProducts from './components/productComponents/SellerProducts';
import BuyerProducts from './components/productComponents/BuyerProducts';
import SellerSpecific from './components/productComponents/SellerSpecific';
import LandingProducts from './components/productComponents/LandingProducts';
import Carousel from './components/Carousel';

export default (
	<Switch>
		<Route exact path="/" component={Landing} />
		<Route path="/dashboard" component={Dashboard} />
		<Route path="/register" component={Register} />
		<Route path="/login" component={Login} />
		<Route path="sellerdashboard" component={SellerProducts} />
		<Route path="buyerdashboard" component={BuyerProducts} />
		<Route path="/sellerspecific" component={SellerSpecific} />
		<Route path="/landingproducts" component={LandingProducts} />
		<Route path="/carousel" component={Carousel} />
		<Route
			path="*"
			render={() =>
				<div>
					<h1>404</h1>
				</div>}
		/>
	</Switch>
);

// Adding everything from dashbord into buyer products and seller products. Useing conditional if this.props.role=== buyer Redirect to buyer products,
// and if seller redirect to seller
