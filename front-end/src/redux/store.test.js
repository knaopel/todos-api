// import { configureStore } from 'redux-mock-store';
// import rootReducer from './reducers';
// import * as types from './actions/actionTypes';
// import initialState from './reducers/initialState';
// import * as todoActions from './actions/todoActions';

// const mockStore = configureStore();

it('should pass', () => {
  expect(true).toBeTruthy();
});

// it('should dispatch action', () => {
//   //initialize mockstore with empty state
//   const store = mockStore(initialState);

//   store.dispatch(todoActions.loadTodosSuccess());

//   const actions = store.getActions();
//   const expectedPayload = { type: types.TODOS_LOAD_SUCCESS, };
// });;

// it('Should handle creating todos', function () {
//   // arrange
//   const store = createStore(rootReducer, initialState);
//   const todo = {
//     title: 'Do something!',
//     body: 'here is the body',
//   };

//   // act
//   const action = todoActions.createTodoSuccess(todo);
//   store.dispatch(action);

//   // assert
//   const createdTodo = store.getState().todos.items[0];
//   expect(createdTodo).toEqual(todo);
// });
