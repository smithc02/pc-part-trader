// import React, { Component } from 'react';
// import ReactDOM from 'react-dom';

// class PaypalButton extends Component {
// 	constructor() {
// 		super();
// 		this.state = {
// 			showButton: false
// 		};

// 		window.React = React;
// 		window.ReactDOM = ReactDOM;
// 	}

// 	componentDidMount() {
// 		const { isScriptLoaded, isScriptLoadSucceed } = this.props;

// 		if (isScriptLoaded && isScriptLoadSucceed) {
// 			this.setState({ showButton: true });
// 		}
// 	}
// 	componentWillReceiveProps() {
// 		const { isScriptLoaded, isScriptLoadSucceed } = nextProps;

// 		const isLoadedButWasntLoadedBefore =
// 			!this.state.showButton &&
// 			!this.props.isScriptLoaded &&
// 			isScriptLoaded;

// 		if (isLoadedButWasntLoadedBefore) {
// 			if (isScriptLoadSucceed) {
// 				this.setState({ showButton: true });
// 			}
// 		}
// 	}

// 	render() {
// 		const paypal = window.PAYPAL;
// 		const {
// 			total,
// 			currency,
// 			env,
// 			commit,
// 			client,
// 			onSuccess,
// 			onError,
// 			onCancel
// 		} = this.props;

// 		const { showButton } = this.state;

// 		const payment = () =>
// 			paypal.rest.payment.create(env, client, {
// 				transactions: [
// 					{
// 						amount: {
// 							total,
// 							currency
// 						}
// 					}
// 				]
// 			});

// 		const onAuthorize = (data, actions) =>
// 			actions.payment.execute().then(() => {
// 				const payment = {
// 					paid: true,
// 					cancelled: false,
// 					payerID: data.payerID,
// 					paymentID: data.paymentID,
// 					paymentToken: data.paymentToken,
// 					returnUrl: data.returnUrl
// 				};

// 				onSuccess(payment);
// 			});

// 		return (
// 			<div>
// 				{showButton &&
// 					<paypal.Button.react
// 						env={env}
// 						client={client}
// 						commit={commit}
// 						payment={payment}
// 						onAuthorize={onAuthorize}
// 						onCancel={onCancel}
// 						onError={onError}
// 					/>}
// 			</div>
// 		);
// 	}
// }

// export default scriptLoader('https://www.paypalobjects.com/api/checkout.js')(
// 	PaypalButton
// );
