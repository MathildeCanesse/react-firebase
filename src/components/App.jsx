import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom'

import HomeContainer from '../containers/homeContainer';

import logo from '../assets/images/logo.svg';
import '../assets/css/app.css';

const App = props => (
  <div className="App">
    <div className="App-header">
      <img src={logo} className="App-logo" alt="logo" />
      <h2>WELCOME</h2>
      <nav>
        <ul>
          <li>
            <Link to="/">Accueil</Link>
          </li>
        </ul>
      </nav>
    </div>
    <HomeContainer />
  </div>
);

App.propTypes = {
  children: PropTypes.object,
};

export default App;
