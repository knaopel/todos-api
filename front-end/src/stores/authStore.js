// import { EventEmitter } from 'events';
// import dispatcher from '../appDispatcher';
// import actionTypes from './actionTypes';

// const CHANGE_EVENT = 'change';
// let _token = null;

// class AuthStore extends EventEmitter {
//   addChangeListener(callback) {
//     this.on(CHANGE_EVENT, callback);
//   }

//   removeChangeListener(callback) {
//     this.removeListener(CHANGE_EVENT, callback);
//   }

//   emitChange() {
//     this.emit(CHANGE_EVENT);
//   }

//   getToken() {
//     return _token;
//   }

//   isAuthenticated() {
//     return _token !== null;
//   }
// }

// const authStore = new AuthStore();
// dispatcher.register(action => {
//   switch (action.actionType) {
//     case actionTypes.AUTH_LOGIN:

//     case actionTypes.AUTH_SET_TOKEN:
//       _token = action.token;
//       authStore.emitChange();
//       break;
//     default:
//   }
// });
// export default authStore;