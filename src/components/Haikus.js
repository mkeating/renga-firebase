import React, { Component } from 'react';


class Haikus extends Component {

	constructor(props) {
		super(props);

		let app = this.props.db.database().ref('haikus');

		/*app.on('value', snapshot => {
			this.getData(snapshot.val());
		});*/
	}

	render(){
		return(
			<div>All the current haikus</div>
			


		)
	}
}

export default Haikus;