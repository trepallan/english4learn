interface User {
  username: string;
  email: string;
}
interface Auth {
  token: string;
  refreshToken: string;
}

function logUser(data: { user: User; auth: Auth }) {
  // Delete any existing tokens
  localStorage.clear();

  localStorage.setItem("auth_token", data.auth.token);
  localStorage.setItem("refresh_token", data.auth.refreshToken);
  localStorage.setItem("username", data.user.username);
  localStorage.setItem("email", data.user.email);
}

export default logUser;
