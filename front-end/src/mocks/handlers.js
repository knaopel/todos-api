import { rest } from 'msw';
const AUTH_TOKEN = 'mocked_auth_token';
export const handlers = [
  rest.post('/signup', (req, res, ctx) => {
    return res(
      ctx.status(201),
      ctx.json({ message: 'Account created', auth_token: AUTH_TOKEN })
    );
  }),
  rest.post('/auth/login', (rer, res, ctx) => {
    sessionStorage.setItem('is-authenticated', 'true');
    return res(ctx.status(200));
  }),
  rest.get('/user', (req, res, ctx) => {
    const isAuthenticated = sessionStorage.getItem('is-authenticated');

    if (!isAuthenticated) {
      return res(
        ctx.status(403),
        ctx.json({
          errorMessage: 'Not Authorized',
        })
      );
    }

    return res(
      ctx.status(200),
      ctx.json({
        name: 'Test User',
        email: 'test@user.io',
      })
    );
  }),
  rest.get('/todos', (req, res, ctx) => {
    if (
      req.headers.has('Authorization') &&
      req.headers.get('Authorization') === AUTH_TOKEN
    ) {
      return res(
        ctx.status(200),
        ctx.json([
          {
            id: 1,
            title: 'Todo one',
            user_id: 1,
          },
          {
            id: 2,
            title: 'Todo Two',
            user_id: 1,
          },
        ])
      );
    } else {
      return res(ctx.status(404), ctx.json({ message: 'Invalid Token' }));
    }
  }),
];
