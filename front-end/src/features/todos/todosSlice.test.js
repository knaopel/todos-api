import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import store from '../../app/store';

import {
  addNewTodo,
  deleteTodo,
  fetchTodos,
  initialState,
  selectOpenTodos,
  selectTodos,
  updateTodo,
} from './todosSlice';

const baseUrl = process.env.REACT_APP_API_URL;
const mock = new MockAdapter(axios);

const sampleTodos = [
  {
    id: 1,
    title: 'Title One',
    body: 'Body One',
    user_id: 1,
    is_completed: false,
  },
  {
    id: 2,
    title: 'Title Two',
    body: 'Body Two',
    user_id: 1,
    is_completed: false,
  },
];

describe('TodosSlice Test Suite', () => {
  describe('Todo store', () => {
    it('should initially have empty todos object', () => {
      const state = store.getState().todos;
      expect(state).toEqual(initialState);
    });
  });

  describe('load todos', () => {
    const path = '/todos/';
    it('Should error on 401', async () => {
      // arrange
      mock.onGet(baseUrl + path).reply(401);
      // act
      const result = await store.dispatch(fetchTodos());
      const state = store.getState().todos;
      // assert
      expect(state.error).toEqual('Request failed with status code 401');
    });
    it('Should set todos in state successfully', async () => {
      // arrange
      mock.onGet(baseUrl + path).reply(200, sampleTodos);
      // act
      const result = await store.dispatch(fetchTodos());
      const state = store.getState().todos;
      // assert
      expect(state.entities[1]).toEqual(sampleTodos[0]);
      expect(state.ids.length).toEqual(2);
      expect(state.status).toEqual('succeeded');
    });
  });
  describe('Add Todo', () => {
    const path = '/todos/';
    const newTodo = { title: 'Title Three', body: 'Body Three', user_id: 1 };
    it('Should error on 401', async () => {
      // arrange
      mock.onPost(baseUrl + path).reply(401);
      // act
      const result = await store.dispatch(addNewTodo(newTodo, 'wrong_token'));
      const state = store.getState().todos;
      // assert
      expect(state.error.message).toEqual(
        'Request failed with status code 401'
      );
    });
    it('Should add a new todo in the store', async () => {
      // arrange
      const expectedTodo = { ...newTodo, id: 3, is_completed: false };
      mock.onPost(baseUrl + path).reply(200, expectedTodo);
      // act
      const result = await store.dispatch(addNewTodo(newTodo, 'fake_token'));
      const state = store.getState().todos;
      // assert
      expect(state.error).toEqual({});
      expect(state.status).toEqual('succeeded');
      expect(state.ids.length).toEqual(3);
      expect(state.entities[3]).toEqual(expectedTodo);
    });
  });
  describe('Update Todo', () => {
    const expectedTodo = {
      ...sampleTodos[1],
      title: 'updated title',
      body: 'updated body',
    };
    const path = '/todos/' + expectedTodo.id;
    it('Should error on 401', async () => {
      // arrange
      mock.onPut(baseUrl + path).reply(401);
      // act
      const result = await store.dispatch(
        updateTodo(expectedTodo, 'wrong_token')
      );
      const state = store.getState().todos;
      // assert
      expect(state.error.message).toEqual(
        'Request failed with status code 401'
      );
    });
    it('Should update store without error', async () => {
      // arrange
      // const expectedTodo = { ...newTodo, id: 3 };
      mock.onPut(baseUrl + path).reply(200, expectedTodo);
      // act
      const result = await store.dispatch(
        updateTodo(expectedTodo, 'fake_token')
      );
      const state = store.getState().todos;
      // assert
      expect(state.error).toEqual({});
      expect(state.status).toEqual('succeeded');
      expect(state.ids.length).toEqual(3);
      expect(state.entities[2]).toEqual(expectedTodo);
    });
  });
  describe('Complete Todo', () => {
    it('Should complete todo successfully', async () => {
      const todoToUpdate = sampleTodos[1];
      const expectedTodo = { ...todoToUpdate, is_completed: true };
      // arrange
      mock.onPut(baseUrl + '/todos/2').reply(200, expectedTodo);
      // act
      const result = await store.dispatch(
        updateTodo({ ...todoToUpdate, is_completed: true }, 'fake_token')
      );
      const state = store.getState();
      const resultOpenTodos = selectOpenTodos(state);
      const resultTodos = selectTodos(state);
      // assert
      expect(state.todos.error).toEqual({});
      expect(resultTodos.length).toEqual(3);
      expect(resultTodos[1].is_completed).toBeTruthy();
      expect(resultOpenTodos.length).toEqual(2);
    });
  });
  describe('Delete todo', () => {
    it('Should remove entity', async () => {
      const todoIdToRemove = 3;
      // const expectedTodo = { ...todoToUpdate, is_completed: true };
      // arrange
      mock
        .onDelete(baseUrl + '/todos/' + todoIdToRemove)
        .reply(200, { id: todoIdToRemove });
      // act
      const result = await store.dispatch(
        deleteTodo(todoIdToRemove, 'fake_token')
      );
      const state = store.getState();
      // const resultOpenTodos = selectOpenTodos(state);
      const resultTodos = selectTodos(state);
      // assert
      expect(state.todos.error).toEqual({});
      expect(resultTodos.length).toEqual(2);
      expect(resultTodos[2]).toBe(undefined);
    });
  });
});
