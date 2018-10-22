import { firebase } from "@firebase/app";
import "@firebase/database";

class FirebaseApi {
  static databasePush(path, value) {
    return new Promise((resolve, reject) => {
      firebase
        .database()
        .ref(path)
        .push(value, error => {
          if (error) {
            reject(error);
          } else {
            resolve();
          }
        });
    });
  }

  static databaseSet(path, value) {
    return firebase
      .database()
      .ref(path)
      .child(value);
  }

  static unsubDatabase(path) {
    return firebase
      .database()
      .ref(path)
      .off();
  }

  static databasePathValueLimitToLast(path, limit, handler) {
    return firebase
      .database()
      .ref(path)
      .limitToLast(limit)
      .on("value", handler);
  }
}

export default FirebaseApi;
