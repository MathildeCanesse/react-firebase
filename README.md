# react-firebase
*A sample tchat app using :*

* create-react-app 
* redux
* firebase

## Installation
* Run `npm install` or `yarn install`
* Once dependencies installed, run: `npm start` or `yarn start`, your default browser will automatically open a new window.


## Todo :
At the moment, all the logic connecting the app with firebase is dirty. The code is in `src/components/ChatRoom.js`.
You must manage all the firebases async actions with the [**redux-sagas**](https://github.com/redux-saga/redux-saga) library in order to make a cleaner code. 
