import React, { Component } from "react";

import ChatContainer from "../containers/chatContainer";
import User from "./User";
import "../assets/css/home.css";

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: ""
    };
  }

  validate = e => {
    const { validateName, updateName } = this.props;
    e.preventDefault();
    updateName(this.state.name);
    validateName();
  };

  updateName = e => {
    this.setState({
      name: e.target.value
    });
  };

  render() {
    const { name, nameValidate } = this.props;
    return (
      <div id="main-home">
        <h3> Messages </h3>
        {name && nameValidate ? (
          <ChatContainer name={name} />
        ) : (
          <User updateName={this.updateName} validateName={this.validate} />
        )}
      </div>
    );
  }
}

export default Home;
