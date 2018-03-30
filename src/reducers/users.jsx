export const NAME = 'USERS';

export const UPDATE_NAME = `${NAME}/UPDATE_NAME`;
export const VALIDATE_NAME = `${NAME}/VALIDATE_NAME`;

const defaultState = {
  name: '',
  nameValidate: false,
};

function reducer(state = defaultState, action) {
  switch (action.type) {
    case UPDATE_NAME:
    case VALIDATE_NAME:
      return { ...state, ...action.payload };
    default:
      return state;
  }
}

export const updateName = name => dispatch =>
  dispatch({ type: UPDATE_NAME, payload: { name } });

export const validateName = () => dispatch =>
  dispatch({ type: VALIDATE_NAME, payload: { nameValidate: true } });

export const getName = state => state[NAME].name;
export const isNameValidate = state => state[NAME].nameValidate;

export default { [NAME]: reducer };
