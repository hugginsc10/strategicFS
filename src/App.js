import React, { Component } from "react"; 
import {
  BrowserRouter as Router,
  Route
} from 'react-router-dom';
import HomePage from './pages/homepage/homepage';
import './App.css'


class App extends Component {
  render() {
    return (
     <div>
        <Router>
          <Route exact path='/' component={HomePage} />
       </Router>
     </div>
    );
  }
}

export default App;