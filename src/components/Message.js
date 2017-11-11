import React, {Component} from 'react';

class Message extends Component {

	constructor(props){

		super(props);
		this.isHaiku = this.props.isHaiku;
	}



	render(){

		let haikuClass;
		if( this.isHaiku){
			haikuClass = 'isHaiku';
		}
		return (
			<div className={haikuClass}>
				{this.props.message}
				
			</div>
		);
	}
}

export default Message;