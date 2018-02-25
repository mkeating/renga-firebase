import React, {Component} from 'react';

class Haiku extends Component {

	constructor(props){

		super(props);
	}

	render(){

		let haiku = this.props.body.map(line => {
			return <p>{line}</p>;
		});
		
		return (
			<div className="haikuBox">
				<div className="haikuBody">
					{haiku}
				</div>
				<div className="haikuDate">
					Created on {this.props.date}
				</div>
			</div>
		);
	}
}

export default Haiku;