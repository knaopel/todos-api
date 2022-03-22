import { rest } from 'msw';
import faker from 'faker';

const BASE_URL = process.env.REACT_APP_API_URL;
const AUTH_TOKEN = 'mocked_auth_token';

const createTodo = id => {
  return {
    id,
    user_id: 1,
    title: faker.lorem.sentence(),
    body: faker.lorem.paragraph(),
    is_complete: false,
  };
};

let todos = [];

for (let i = 0; i < 25; i++) {
  todos.push(createTodo(i));
}

export const todoHandlers = [
  rest.get(`${BASE_URL}/todos`, (req, res, ctx) => {
    if (
      req.headers.has('Authorization') &&
      req.headers.get('Authorization') === AUTH_TOKEN
    ) {
      return res(ctx.status(200), ctx.json(todos));
    } else {
      return res(ctx.status(404), ctx.json({ message: 'Invalid Token' }));
    }
  }),
  rest.get(`${BASE_URL}/todos/:id`, (req, res, ctx) => {
    if (
      req.headers.has('Authorization') &&
      req.headers.get('Authorization') === AUTH_TOKEN
    ) {
      const todo = todos.find(todo => req.params.id === todo.id);
      return res(ctx.status(200), ctx.json(todo));
    } else {
      return res(ctx.status(404), ctx.json({ message: 'Invalid Token' }));
    }
  }),
];
