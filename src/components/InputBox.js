import React, {Component} from 'react';

import trim from 'trim';

import syllable from 'syllable';


class InputBox extends Component {

	constructor(props) {
		super(props);

		this.onChange = this.onChange.bind(this);
		this.onSubmit= this.onSubmit.bind(this);

		this.state = {
			message: ''
		};
	}

	onChange(event) {
		this.setState({
			message: event.target.value
		});
	}

	onSubmit(event) {

		event.preventDefault();

			//check for haiku

			let haiku = false;

			let dbCon = this.props.db.database().ref();

			console.log(this.props.lastTwo);
			if(syllable(trim(this.state.message)) === 5 
				&& this.props.lastTwo[0].syllables === 5 
				&& this.props.lastTwo[1].syllables === 7) {
				
				haiku = true;
				
				dbCon.child('haikus').push({
					haiku: [this.props.lastTwo[0].message, this.props.lastTwo[1].message, this.state.message]
				});

				//update lastTwo in the db
				dbCon.child('/messages/' + this.props.lastTwo[0].key).update({isHaiku: true});
				dbCon.child('/messages/' + this.props.lastTwo[1].key).update({isHaiku: true});

				
			}

			//target firebase collection and push

			dbCon.child('/messages').push({
				message: trim(this.state.message),
				syllables: syllable(trim(this.state.message)),
				isHaiku: haiku
			});

			//reset input
			this.setState({
				message: ''
			});
		
	}

	render(){
		return (
			<form onSubmit={this.onSubmit}>
				<textarea
					placeholder = "type a message"
					onChange = {this.onChange}
					value = {this.state.message}
				>
				</textarea>

				<input type="submit" value="submit" />
			</form>
		);
	}
}

export default InputBox;