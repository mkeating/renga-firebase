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

			console.log('this is last two');
			console.log(this.props.lastTwo);

			//determine if this latest input creates a haiku
			if(syllable(trim(this.state.message)) === 5 
				&& this.props.lastTwo[0].syllables === 5 
				&& this.props.lastTwo[1].syllables === 7) {
				

				console.log('haiku created!');
				haiku = true;


				//if a haiku is created, we add it to the database as a new object
				dbCon.child('haikus').push({
					haiku: [this.props.lastTwo[0].message, this.props.lastTwo[1].message, this.state.message],
					createdOn: new Date(Date.now()).toLocaleString()
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
				<input type="text" maxLength="200" placeholder = "type a message"
					onChange = {this.onChange}
					value = {this.state.message} />
				
				<input type="submit" value="submit" />
			</form>
		);
	}
}

export default InputBox;