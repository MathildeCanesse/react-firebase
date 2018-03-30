import React, { Component } from 'react';
import isEmpty from 'lodash/fp/isEmpty';
import * as firebase from 'firebase';

import '../assets/css/chat.css';

class Chat extends Component {
  constructor(props) {
    super(props);

    const rootRef = firebase.database().ref();
    this.messagesRef = rootRef.child('messages');

    this.state = {
      messageWriting: '',
    };
  }

  componentDidMount() {
    this.scrollToBottom();
    this.messagesRef.on('value', snapshot => {
      const messages = snapshot.val()
        ? Object.keys(snapshot.val()).map(key => {
          return snapshot.val()[key];
        })
        : [];

      !isEmpty(messages) && this.props.updateMessages(messages);
    });
  }

  componentDidUpdate() {
    this.scrollToBottom();
  }

  componentWillUnmount() {
    this.messagesRef.on('value').off();
  }

  scrollToBottom = () => {
    this.scrollRef.scrollTop = this.scrollRef.scrollHeight;
  };

  handleTextChange = e => {
    this.setState({
      messageWriting: e.target.value,
    });
  };

  sendNewMessage = e => {
    const { name } = this.props;
    e.preventDefault();

    // On ajoute une nouvelle entrée dans notre base de données et on récupère la clé correspondante
    const newMessageKey = this.messagesRef.push().key;

    // On décrit notre nouvelle entrée
    let updates = {};
    updates['/messages/' + newMessageKey] = {
      name: name,
      text: this.state.messageWriting,
    };

    // On met à jour
    firebase.database().ref().update(updates);

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
                <div className="main-nav-item">
                  general - {name}
                </div>
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
            <button onClick={this.sendNewMessage} className="send" id="send" />
          </div>
        </div>
      </form>
    );
  }
}

export default Chat;
