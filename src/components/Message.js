import React, {Component} from 'react';

class Message extends Component {

	constructor(props){

		super(props);
		this.state = {
			isHaiku: this.props.isHaiku,
		};		
		this.haikuClass = '';
	}

	componentWillMount() {
		/*if(this.props.isHaiku){
			this.setState({haikuClass: 'isHaiku'});
		}*/

		/*if(this.props.isHaiku){
			this.haikuClass = "isHaiku";
		}*/
	}

	componentWillUpdate() {
		console.log('testing message did update');
		console.log(this.props.isHaiku);
		/*if(this.props.isHaiku){
			this.setState({haikuClass: 'isHaiku'});
		}*/
		if(this.props.isHaiku){
			this.haikuClass = "isHaiku";
		}
		

	}

	render(){

		
		return (
			<div className= {[this.haikuClass, 'message'].join(' ')} >
				{this.props.message}	
			</div>
		);
	}
}

export default Message;