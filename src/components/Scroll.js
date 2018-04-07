import React, {Component} from 'react';


import Message from './Message';

import InputBox from './InputBox';

import _ from 'lodash';

import { CSSTransitionGroup } from 'react-transition-group';

import '../css/Scroll.css';

import Panel from 'muicss/lib/react/panel';





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
				<div className="scrollContainer">
				<p>"Renga (連歌, collaborative poetry) is a genre of Japanese collaborative poetry — poetry written by more than one author working together." You and everyone else can work together on the same scroll in real-time. If a haiku is created, it will be added to <a href="/haikus">the archive.</a></p>
				<Panel className="messageContainerBuffer">
					<ul className="messageContainer">
						<CSSTransitionGroup
					          transitionName="message"
					          transitionEnterTimeout={500}
					          transitionLeaveTimeout={500}>
					          {messageNodes}
					    </CSSTransitionGroup>
				    </ul>
			    </Panel>
				<InputBox db={this.props.db} lastTwo={lastTwo}/>

			
				</div>
		);
	}
}

export default Scroll;