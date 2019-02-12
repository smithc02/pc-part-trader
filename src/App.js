import React, { Component } from 'react';
import store from './ducks/store';
import './App.css';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';
import routes from './routes';

class App extends Component {
	render() {
		return (
			<Provider store={store}>
				<Router>
					<div className="App">
						{routes}
					</div>
				</Router>
			</Provider>
		);
	}
}
export default App;
