import FirebaseApi from '../api/firebase';
export const NAME = 'MESSAGES';

export const LAUNCH_PUSH_MESSAGES = `${NAME}/LAUNCH_PUSH_MESSAGES`;
export const FETCH_MESSAGES_SUCCESS = `${NAME}/FETCH_MESSAGES_SUCCESS`;
export const FETCH_MESSAGES_ERROR = `${NAME}/FETCH_MESSAGES_ERROR`;
export const PUSH_MESSAGES_SUCCESS = `${NAME}/PUSH_MESSAGES_SUCCESS`;
export const PUSH_MESSAGES_ERROR = `${NAME}/PUSH_MESSAGES_ERROR`;
export const UPDATE_MESSAGES = `${NAME}/UPDATE_MESSAGES`;
export const REQUEST_MESSAGES = `${NAME}/REQUEST_MESSAGES`;

const defaultState = {
  messages: [],
};

function reducer(state = defaultState, action) {
  switch (action.type) {
    case FETCH_MESSAGES_SUCCESS:
      const messages = Object.keys(action.payload).map(
        key => action.payload[key]
      );
      return { ...state, messages };
    default:
      return state;
  }
}

export const requestMessages = () => dispatch =>
  dispatch({
    type: REQUEST_MESSAGES,
  });

export const launchPushMessages = message => dispatch =>
  dispatch({
    type: LAUNCH_PUSH_MESSAGES,
    message,
  });

export const fetchMessagesSuccess = messages => ({
  type: FETCH_MESSAGES_SUCCESS,
  payload: messages,
});

export const fetchMessagesError = () => ({
  type: FETCH_MESSAGES_ERROR,
});

export const pushMessagesSuccess = message => ({
  type: PUSH_MESSAGES_SUCCESS,
});

export const pushMessagesError = message => ({
  type: PUSH_MESSAGES_ERROR,
});

export const updateMessages = messages => dispatch =>
  dispatch({ type: UPDATE_MESSAGES, messages });

export const initDatabase = () => () =>
  FirebaseApi.databaseSet('/messages/', 'messages');

export const getMessages = state => state[NAME].messages;

export default { [NAME]: reducer };
