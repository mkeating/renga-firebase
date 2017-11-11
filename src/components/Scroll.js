import React, {Component} from 'react';


import Message from './Message';

import InputBox from './InputBox';

import _ from 'lodash';




class Scroll extends Component {
	
	constructor(props) {
		super(props);
		this.state = {
			messages: []
		};

		let app = this.props.db.database().ref('messages').limitToLast(5);
		
		app.on('value', snapshot => {
			this.getData(snapshot.val());
		});
	}



	getData(values) {
		let messagesVal = values;
		let messages = _(messagesVal)
						.keys()
						.map(messageKey => {
							let cloned = _.clone(messagesVal[messageKey]);
							cloned.key = messageKey;
							return cloned;
						})
						.value();

		console.log(messages);
		this.setState({
			messages: messages
		});

	}

	haikuCreated () {
		console.log('haiku created!');
	}

	render(){

		let lastTwo = this.state.messages.slice(-2);

		let messageNodes = this.state.messages.map(message => {
			return (
				<div>
					<Message message = {message.message} key={message.key} isHaiku={message.isHaiku}/>
				</div>
			);
		});

		return (
			<div>
				{messageNodes}

				<InputBox db={this.props.db} lastTwo={lastTwo} haikuCreated={this.haikuCreated()}/>
			</div>
		);
	}
}

export default Scroll;