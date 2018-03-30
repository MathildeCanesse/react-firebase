import * as firebase from 'firebase';

class FirebaseApi {
  static initAuth() {
    return new Promise((resolve, reject) => {
      const unsub = firebase.auth().onAuthStateChanged(
        user => {
          unsub();
          resolve(user);
        },
        error => reject(error)
      );
    });
  }

  static databasePush(path, value) {
    return new Promise((resolve, reject) => {
      firebase
        .database()
        .ref(path)
        .push(value, (error) => {
          if (error) {
            reject(error);
          } else {
            resolve();
          }
        });
    });
  }

  static databaseSet(value) {
    return firebase.database().ref().child(value);
  }

  static unsubDatabase(path) {
    return firebase.database().ref(path).off();
  }

  static databasePathValueLimitToLast(path, limit, handler) {
    return firebase
      .database()
      .ref(path)
      .limitToLast(limit)
      .on('value', handler);
  }
}

export default FirebaseApi;
