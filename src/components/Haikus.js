import React, { Component } from 'react';

import Haiku from './Haiku';

import _ from 'lodash';

class Haikus extends Component {

	constructor(props) {
		super(props);

		this.state = {
			'haikus': []
		};

		let app = this.props.db.database().ref('haikus');

		//TODO: order on createdOn
		app.orderByChild('createdOn').on('value', snapshot => {
			this.getData(snapshot.val());
		});
	}

	getData(values) {

		let haikusVal = values;
		
		//maps the response from firebase to an array and assigns keys for use in the component
		let haikus = _(haikusVal).keys().map(key => {
			let cloned = _.clone(haikusVal[key]);
			cloned.key = key;
			return cloned;
		}).value();

		console.log('from haikus');
		console.log(haikus);

		this.setState({
			haikus: haikus
		});

	}

	render(){

		

		let haikusNodes = this.state.haikus.map(haiku => {
			return (
				<div class="col">
					<Haiku key={haiku.key} body={haiku.haiku} date={haiku.createdOn} />
				
				</div>

				)
		})

		return(
			<div>
			<div>All the current haikus</div>

			<div class="flex-grid">
				
				{haikusNodes}	

			</div>
			
			
			</div>

		)
	}
}

export default Haikus;