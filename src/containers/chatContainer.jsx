import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import ChatComponent from '../components/ChatRoom';
import { getMessages, updateMessages } from '../reducers/ChatReducer';

const mapStateToProps = createStructuredSelector({
  messages: getMessages,
});

const mapDispatchToProps = {
  updateMessages,
};

const ChatContainer = connect(mapStateToProps, mapDispatchToProps)(
  ChatComponent
);

export default ChatContainer;
