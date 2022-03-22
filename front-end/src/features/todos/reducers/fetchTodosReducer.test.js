import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import store from '../../../app/store';
import faker from 'faker';
import { fetchTodos } from './fetchTodosReducer';

const baseUrl = process.env.REACT_APP_API_URL;
const mock = new MockAdapter(axios);
let mockTodos = [];

for (let i = 1; i <= 5; i++) {
  mockTodos.push({
    id: i,
    title: faker.lorem.sentence(),
    body: faker.lorem.paragraph(),
    is_complete: i > 3,
  });
}

describe('fetchTodosReducer test suite', () => {
  // beforeEach(() => {
  //   // store.dispatch(logoutUser());
  // });
  test('Should fail on 401 error',async()=>{
    // arrange
    mock.onGet(`${baseUrl}/todos/`).reply(401);
    // act
    await store.dispatch(fetchTodos());
    // assert
    const state = store.getState().todos;
    expect(state.error).toEqual('Request failed with status code 401');
    expect(state.status).toEqual('failed');
  })
  test('sets store after fetch', async () => {
    // arrange
    mock.onGet(`${baseUrl}/todos/`).reply(200, mockTodos);

    let state = store.getState().todos;
    expect(state.ids.length).toEqual(0);

    // act
    await store.dispatch(fetchTodos('mocked_auth_token'));

    // assert
    state = store.getState().todos;
    // console.log(state);
    expect(state.ids.length).toEqual(5);
  });
});
