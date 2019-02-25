import React, { Component } from 'react';
import io from 'socket.io-client';

class ChatRoomOne extends Component {
	constructor() {
		super();
		this.state = {
			socket: io()
		};
	}

	componentDidMount() {
		this.state.socket.on('connect', () => {
			console.log('Hello, im connected');
		});
	}

	render() {
		return (
			<div>
				<h1>Chat Room One!</h1>
			</div>
		);
	}
}

export default ChatRoomOne;
