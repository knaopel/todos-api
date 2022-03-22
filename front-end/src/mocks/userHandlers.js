import { rest } from "msw";

const BASE_URL = process.env.REACT_APP_API_URL;
const AUTH_TOKEN = 'mocked_auth_token';

export const userHandlers = [
  rest.post(`${BASE_URL}/signup`, (req, res, ctx) => {
    if (req.body.email === 'bad') {
      return res(ctx.status(401), ctx.json({ message: 'bad request' }));
    }
    return res(
      ctx.status(201),
      ctx.json({ message: 'Account created', auth_token: AUTH_TOKEN })
    );
  }),
  rest.post(`${BASE_URL}/auth/login`, (req, res, ctx) => {
    if (req.body.email === 'bad') {
      return res(ctx.status(401), ctx.json({ message: 'unauthorized' }));
    }
    sessionStorage.setItem('is-authenticated', 'true');
    return res(ctx.status(200), ctx.json({ auth_token: AUTH_TOKEN }));
  }),
  rest.get(`${BASE_URL}/user`, (req, res, ctx) => {
    const auth_token = req.headers.get('authorization');
    const isAuthenticated = Boolean(auth_token);

    if (isAuthenticated) {
      if (auth_token === 'kurt_token') {
        return res(
          ctx.status(200),
          ctx.json({
            name: 'Kurt Opel',
            email: 'kurt@kurtopel.com',
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
    }

    return res(
      ctx.status(403),
      ctx.json({
        errorMessage: 'Not Authorized',
      })
    );
  })
];
