// import { EventEmitter } from 'events';
// import dispatcher from '../appDispatcher';
// import actionTypes from './actionTypes';

// const CHANGE_EVENT = 'change';
// let _todos = [];

// class TodosStore extends EventEmitter {
//   addChangeListener(callback) {
//     this.on(CHANGE_EVENT, callback);
//   }

//   removeChangeListener(callback) {
//     this.removeListener(CHANGE_EVENT, callback);
//   }

//   emitChange() {
//     this.emit(CHANGE_EVENT);
//   }

//   getTodos() {
//     return _todos;
//   }

// }

// const todosStore = new TodosStore();

// dispatcher.register(action => {
//   switch (action.type) {
//     case actionTypes.DELETE_TODO:
//       _todos = _todos.filter(todo => todo.id !== parseInt(action.id, 10));
//       todosStore.emitChange();
//       break;
//     case actionTypes.CREATE_TODO:
//       _todos.push(action.todo);
//       todosStore.emitChange();
//       break;
//     case actionTypes.UPDATE_TODO:
//       _todos = _todos.map(todo => todo.id === action.todo.id ? action.todo : todo);
//       todosStore.emitChange();
//       break;
//     case actionTypes.LOAD_TODOS:
//       _todos = action.courses;
//       todosStore.emitChange();
//       break;
//     default:
//       break;
//   }
// });

// export default todosStore;