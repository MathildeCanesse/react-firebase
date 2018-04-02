import React, { Component } from 'react';
import isEmpty from 'lodash/fp/isEmpty';

import '../assets/css/chat.css';
import {
  initDatabase,
  launchPushMessages,
  requestMessages,
} from '../reducers/ChatReducer';
import { connect } from 'react-redux';

class Chat extends Component {
  constructor(props) {
    super(props);
    this.props.initDatabase();
    this.state = {
      messageWriting: '',
    };
  }

  componentDidMount() {
    this.props.requestMessages();
    this.scrollToBottom();
  }

  componentDidUpdate() {
    this.scrollToBottom();
  }

  scrollToBottom = () => {
    this.scrollRef.scrollTop = this.scrollRef.scrollHeight;
  };

  handleTextChange = e => {
    this.setState({
      messageWriting: e.target.value,
    });
  };

  sendNew = e => {
    e.preventDefault();
    const { name, launchPushMessages } = this.props;

    const message = {
      name: name,
      text: this.state.messageWriting,
    };

    launchPushMessages(message);

    this.setState({
      messageWriting: '',
    });
  };

  render() {
    const { messages, name } = this.props;

    return (
      <form>
        <div className="wrapper">
          <nav className="nav" id="nav">
            <div className="default-nav">
              <div className="main-nav">
                <div className="main-nav-item">general - {name}</div>
                <div className="options" />
              </div>
            </div>
          </nav>
          <div className="inner" id="inner" ref={ref => (this.scrollRef = ref)}>
            <div className="content" id="content">
              {!isEmpty(messages)
                ? messages.map((message, index) => {
                    if (message.name === name) {
                      return (
                        <div className="message-wrapper me " key={index}>
                          <div className="text-wrapper animated fadeIn">
                            {message.text}
                          </div>
                        </div>
                      );
                    } else {
                      return (
                        <div className="message-wrapper them" key={index}>
                          <div className="circle-wrapper animated bounceIn">
                            {message.name}
                          </div>
                          <div className="text-wrapper animated fadeIn">
                            {message.text}
                          </div>
                        </div>
                      );
                    }
                  })
                : 'pas encore de messages...'}
            </div>
          </div>
          <div className="bottom" id="bottom">
            <textarea
              onChange={this.handleTextChange}
              className="input"
              id="input"
              placeholder="saisissez votre texte ici.."
              value={this.state.messageWriting}
            />
            <button onClick={this.sendNew} className="send" id="send" />
          </div>
        </div>
      </form>
    );
  }
}

const mapDispatchToProps = {
  initDatabase,
  launchPushMessages,
  requestMessages,
};

export default connect(null, mapDispatchToProps)(Chat);
