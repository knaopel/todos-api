import { rest } from 'msw';
export const handlers = [
  rest.post('/auth/login', (rer, res, ctx) => {
    sessionStorage.setItem('is-authenticated', 'true');
    return res(
      ctx.status(200)
    );
  }),
  rest.get('/user', (req, res, ctx) => {
    const isAuthenticated = sessionStorage.getItem('is-authenticated');

    if (!isAuthenticated) {
      return res(
        ctx.status(403),
        ctx.json({
          errorMessage: 'Not Authorized'
        })
      );
    }

    return res(
      ctx.status(200),
      ctx.json({
        name: 'Test User',
        email: 'test@user.io'
      })
    );
  })
];