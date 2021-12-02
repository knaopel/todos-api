import { createStore } from 'redux';
import rootReducer from './reducers';
import initialState from './reducers/initialState';
import * as todoActions from './actions/todoActions';

it('Should handle creating todos', function () {
  // arrange
  const store = createStore(rootReducer, initialState);
  const todo = {
    title: 'Do something!',
    body: 'here is the body',
  };

  // act
  const action = todoActions.createTodoSuccess(todo);
  store.dispatch(action);

  // assert
  const createdTodo = store.getState().todos[0];
  expect(createdTodo).toEqual(todo);
});
