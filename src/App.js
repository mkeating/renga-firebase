import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

import firebase from 'firebase';

import Scroll from './components/Scroll';

const config = require('./config.js');

class App extends Component {

  constructor(props){
    super(props);

    firebase.initializeApp(config);
  }


  render() {
    return (
      <div> 
        <h1>Renga</h1>

          <Scroll db={firebase} />

          

      </div>
    );
  }
}

export default App;
