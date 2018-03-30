import React from 'react';
import PropTypes from 'prop-types';

import '../assets/css/user_name.css';

const User = props =>
  <div id="get-user-name">
    <input
      onChange={props.updateName}
      className="input"
      id="input"
      placeholder="saisissez votre nom ici.."
    />
    <button onClick={props.validateName} className="send" id="send">
      Valider !
    </button>
  </div>;

User.propTypes = {
  updateName: PropTypes.func,
  validate: PropTypes.func,
};

export default User;
