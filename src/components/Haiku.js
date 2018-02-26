import React, {Component} from 'react';

import Panel from 'muicss/lib/react/panel';

class Haiku extends Component {

	constructor(props){

		super(props);
	}

	render(){

		let haiku = this.props.body.map(line => {
			return <p>{line}</p>;
		});
		
		return (
			
			<Panel className="haikuBox">
				<div className="haikuBody">
					{haiku}
				</div>
				<div className="haikuDate">
					Created on {this.props.date}
				</div>
			</Panel>
			
		);
	}
}

export default Haiku;