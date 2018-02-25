import React, {Component} from 'react';


import Message from './Message';

import InputBox from './InputBox';

import _ from 'lodash';

import { CSSTransitionGroup } from 'react-transition-group';

import '../css/Scroll.css';



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
		
		//maps the response from firebase to an array and assigns keys for use in the component
		let messages = _(messagesVal).keys().map(key => {
			let cloned = _.clone(messagesVal[key]);
			cloned.key = key;
			return cloned;
		}).value();

		this.setState({
			messages: messages
		});

	}

	render() {

		let lastTwo = this.state.messages.slice(-2);

		let messageNodes = this.state.messages.map(message => {

			return (
				
					<Message message={message.message} key={message.key} isHaiku={message.isHaiku}/>
			);
		});

		return (
				<div>
				<div className="message-wrapper">
				<CSSTransitionGroup
			          transitionName="message"
			          transitionEnterTimeout={500}
			          transitionLeaveTimeout={500}>
			          {messageNodes}
			    </CSSTransitionGroup>
			    </div>
				<InputBox db={this.props.db} lastTwo={lastTwo}/>
				</div>
		);
	}
}

export default Scroll;