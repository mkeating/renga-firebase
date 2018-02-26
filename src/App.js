import React, { Component } from 'react';
import { Route, BrowserRouter } from 'react-router-dom';

import './App.css';

import firebase from 'firebase';
import Scroll from './components/Scroll';
import Haikus from './components/Haikus';

const config = require('./config.js');

class App extends Component {

  constructor(props){
    super(props);

    firebase.initializeApp(config);
  }


  render() {
    return (
      <div> 
        <div className="appTitleContainer">
          <h1 className="appTitle">Renga</h1>
        </div>
        <BrowserRouter>
          <div>
          <Route exact path="/"
                  render={(props) => <Scroll db={firebase} />}
          />

          <Route path="/haikus"
                  render={(props) => <Haikus db={firebase} />} 

          />
          
          </div>
          </BrowserRouter>

      </div>
    );
  }
}

export default App;
