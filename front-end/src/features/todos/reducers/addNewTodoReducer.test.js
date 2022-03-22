import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import store from '../../../app/store';
import { addNewTodo } from './addNewTodoReducer';
import faker from 'faker';

const baseUrl = process.env.REACT_APP_API_URL;
const mock = new MockAdapter(axios);
const mockSubmit = {
  title: faker.lorem.sentence(),
  body: faker.lorem.paragraph(),
};
const mockTodo = {
  id: faker.datatype.number(9),
  is_complete: false,
  ...mockSubmit,
};

describe('fetchTodosReducer test suite', () => {
  // beforeEach(() => {
  //   // store.dispatch(logoutUser());
  // });
  test('Should fail on 401 error', async () => {
    // arrange
    mock.onPost(`${baseUrl}/todos/`).reply(401);

    // act
    await store.dispatch(addNewTodo(mockSubmit, 'token'));

    // assert
    const state = store.getState().todos;
    expect(state.error.message).toEqual('Request failed with status code 401');
    expect(state.status).toEqual('failed');
  });
  test('sets store after post', async () => {
    // arrange
    mock.onPost(`${baseUrl}/todos/`).reply(200, mockTodo);

    let state = store.getState().todos;
    expect(state.ids.length).toEqual(0);

    // act
    await store.dispatch(addNewTodo(mockSubmit, 'token'));

    // assert
    state = store.getState().todos;
    // console.log(state);
    expect(state.ids.length).toEqual(1);
    expect(state.entities[mockTodo.id]).toEqual(mockTodo);
  });
});
