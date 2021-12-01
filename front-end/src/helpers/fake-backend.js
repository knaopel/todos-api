export function configureFakeBackend() {
  let users = [{ id: 1, username: 'test', password: 'test', firstName: 'Test', lastName: 'User' }];
  let realFetch = window.fetch;
  window.fetch = function (url, opts) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (url.endsWith('/users/authenticate') && opts.method === 'POST') {
          let params = JSON.parse(opts.body);
          let filteredUsers = users.filter(user => {
            return user.username === params.username && user.password === params.password;
          });

          if (filteredUsers.length) {
            let user = filteredUsers[0];
            let responseJson = {
              id: user.id,
              username: user.username,
              firstName: user.firstName,
              lastName: user.lastName,
              token: 'fake-jwt-token'
            };
            resolve({ ok: true, text: () => Promise.resolve(JSON.stringify(responseJson)) });
          } else {
            reject('Username or password is incorrect.');
          }
          return;
        }

        if (url.endsWith('/users') && opts.method === 'GET') {
          if (opts.headers && opts.headers.Authorization === 'Bearer fake-jwt-token') {
            resolve({ ok: true, text: () => Promise.resolve(JSON.stringify(users)) });
          } else {
            reject('Unauthorized');
          }
          return;
        }

        realFetch(url, opts).then(response => resolve(response));
      }, 500);
    });
  };
}