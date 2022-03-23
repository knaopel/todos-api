import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import store from '../../../app/store';
import { addNewTodo } from './addNewTodoReducer';
import { deleteTodo } from './deleteTodoReducer';
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

describe('deleteTodoReducer test suite', () => {
  // test('should fail on 401 error', async () => {
  //   // arrange
  //   const apiUrl = `${baseUrl}/todos/${mockTodo.id}`; 
  //   mock.onDelete(apiUrl).reply(401);

  //   // act
  //   await store.dispatch(deleteTodo(mockTodo.id, 'mock_token'));

  //   // assert
  //   const state = store.getState().todos;
  //   expect(state.error.message).toEqual('Request failed with status code 401');
  //   expect(state.status).toEqual('failed');
  // });
  test('should remove from store after delete', async () => {
    // arrange
    mock.onPost(`${baseUrl}/todos/`).reply(201, mockTodo);
    mock.onDelete(`${baseUrl}/todos/${mockTodo.id}`).reply(200);

    await store.dispatch(addNewTodo(mockSubmit,'mocked_token'));
    let state = store.getState().todos;
    expect(state.ids.length).toBe(1);

    // act
    await store.dispatch(deleteTodo(mockTodo.id,'mocked_token'));
    state = store.getState().todos;
    expect(state.ids.length).toBe(0);
    // assert

  })
})