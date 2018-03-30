export const NAME = 'MESSAGES';

export const UPDATE_MESSAGES = `${NAME}/UPDATE_MESSAGES`;

const defaultState = {
  messages: [],
};

function reducer(state = defaultState, action) {
  switch (action.type) {
    case UPDATE_MESSAGES:
      return {
        ...state,
        messages: [...state.messages, ...action.messages],
      };
    default:
      return state;
  }
}

export const updateMessages = messages => dispatch =>
  dispatch({ type: UPDATE_MESSAGES, messages });

export const getMessages = state => state[NAME].messages;

export default { [NAME]: reducer };
