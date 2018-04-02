import { call, fork, put, take, takeEvery } from 'redux-saga/effects';
import { eventChannel } from 'redux-saga';

import firebaseApi from '../api/firebase';
import {
  fetchMessagesError,
  fetchMessagesSuccess,
  LAUNCH_PUSH_MESSAGES,
  pushMessagesError,
  pushMessagesSuccess,
  REQUEST_MESSAGES,
} from '../reducers/ChatReducer';

const MAX_MESSAGES = 10;
const PATH = '/messages/';

export function* writeMessage({ message }) {
  try {
    yield call(firebaseApi.databasePush, PATH, message);
    yield put(pushMessagesSuccess(message));
  } catch (error) {
    yield put(pushMessagesError());
  }
}

export function* pushMessage() {
  yield takeEvery(LAUNCH_PUSH_MESSAGES, writeMessage);
}

export function createEventChannel() {
  const listener = eventChannel(emit => {
    firebaseApi.databasePathValueLimitToLast(PATH, MAX_MESSAGES, snap =>
      emit(snap.val() || {})
    );
    return () => {
      firebaseApi.unsubDatabase(PATH);
    };
  });
  return listener;
}

export function* watchFetchMessages() {
  const updateMessages = createEventChannel();
  while (true) {
    try {
      const messages = yield take(updateMessages);
      yield put(fetchMessagesSuccess(messages));
    } catch (error) {
      yield put(fetchMessagesError(error));
    }
  }
}

function* watchRequests() {
  while (true) {
    yield take(REQUEST_MESSAGES);
    yield fork(watchFetchMessages);
  }
}

export default function* startFireBase() {
  yield fork(watchRequests);
  yield fork(pushMessage);
}
