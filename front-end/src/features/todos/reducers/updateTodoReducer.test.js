import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import store from '../../../app/store';
import { updateTodo } from './updateTodoReducer';
import faker from 'faker';
import { addNewTodo } from './addNewTodoReducer';

const baseUrl = process.env.REACT_APP_API_URL;
const mock = new MockAdapter(axios);

const mockInitialParams = {
  title: faker.lorem.sentence(),
  body: faker.lorem.paragraph(),
};

const mockInitialTodo = {
  ...mockInitialParams,
  id: faker.datatype.number(9),
  is_complete: false,
};

const mockUpdatedTodo = {
  ...mockInitialTodo,
  title: faker.lorem.sentence(),
  body: faker.lorem.paragraph(),
};

describe('updateTodosReducer test suite', () => {
  test('Should fail on 401 error', async () => {
    // arrange
    const apiUrl = `${baseUrl}/todos/${mockInitialTodo.id}`;
    mock.onPut(apiUrl).reply(401);

    // act
    await store.dispatch(updateTodo(mockUpdatedTodo, 'token'));

    // assert
    const state = store.getState().todos;
    expect(state.error.message).toEqual('Request failed with status code 401');
    expect(state.status).toEqual('failed');
  });
  test('sets store after put', async () => {
    // arrange
    mock.onPost(`${baseUrl}/todos/`).reply(200, mockInitialTodo);
    mock
      .onPut(`${baseUrl}/todos/${mockInitialTodo.id}`)
      .reply(200, mockUpdatedTodo);

    await store.dispatch(addNewTodo(mockInitialParams, 'mock_token'));

    let state = store.getState().todos;
    expect(state.ids.length).toEqual(1);

    // act
    await store.dispatch(updateTodo(mockUpdatedTodo, 'mock_token'));

    // assert
    state = store.getState().todos;
    expect(state.ids.length).toEqual(1);
    expect(state.entities[mockInitialTodo.id]).toEqual(mockUpdatedTodo);
  });
});
