import { useState } from "react";
import api from "../../authentication/api";

interface User {
  username: string;
  password: string;
  confirmPassword: string;
  email: string;
}

function Login() {
  const [user, setUser] = useState<User>({
    username: "",
    password: "",
    confirmPassword: "",
    email: "",
  });

  function LoginFunction(event: any) {
    event.preventDefault();
    const config = {
      method: "POST",
      path: "/authorization/login",
      body: user,
    };

    api(config);
  }
  return (
    <>
      <h1>Login</h1>

      <div className="centerForm">
        <form className="form-group" onSubmit={LoginFunction}>
          <label htmlFor="username">Username</label>
          <input
            type="text"
            className="form-control"
            id="username"
            value={user.username}
            onChange={(e) => setUser({ ...user, username: e.target.value })}
          />

          <label htmlFor="email">Email</label>
          <input
            type="email"
            className="form-control"
            id="email"
            value={user.email}
            onChange={(e) => setUser({ ...user, email: e.target.value })}
          />

          <label htmlFor="password">Password</label>
          <input
            type="password"
            className="form-control"
            id="password"
            value={user.password}
            onChange={(e) => setUser({ ...user, password: e.target.value })}
          />

          <label htmlFor="confirmPassword">Confirm Password</label>
          <input
            type="password"
            className="form-control"
            id="confirmPassword"
            value={user.confirmPassword}
            onChange={(e) =>
              setUser({ ...user, confirmPassword: e.target.value })
            }
          />

          <button type="submit" className="btn btn-primary">
            Submit
          </button>
        </form>
      </div>
    </>
  );
}

export default Login;
