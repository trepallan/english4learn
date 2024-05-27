import { useState } from "react";
import api from "../../authentication/api";
import logUser from "../../utils/logUser";
import "../../css/auth.css";

interface User {
  password: string;
  email: string;
}

function Login({ setpath }: any) {
  const [user, setUser] = useState<User>({
    password: "",
    email: "",
  });
  const [message, setMessage] = useState<string>("");

  async function LoginFunction(event: any) {
    event.preventDefault();

    if (user.email === "" || user.password === "") {
      setMessage("All fields are required");
      return;
    }

    const response = await api.post("/authorization/login", user);

    if (response.status !== 200) {
      setMessage(response.message);
      return;
    }

    logUser(response);
    window.location.href = "/";
  }

  return (
    <div className="authForm">
      <h1>Login</h1>
      <hr />

      <form className="form-group" onSubmit={LoginFunction}>
        <label htmlFor="email">Email</label>
        <input
          type="email"
          className="form-control"
          required
          autoComplete="email"
          id="email"
          value={user.email}
          onChange={(e) => setUser({ ...user, email: e.target.value })}
        />

        <label htmlFor="password">Password</label>
        <input
          type="password"
          className="form-control"
          autoComplete="current-password"
          id="password"
          required
          value={user.password}
          onChange={(e) => setUser({ ...user, password: e.target.value })}
        />

        <div className="footer">
          <p>
            Not registered? <i onClick={() => setpath("/register")}>Register</i>
          </p>

          {message && <div className="alert alert-danger">{message}</div>}

          <button type="submit" className="btn btn-primary btn-lg">
            Login
          </button>
        </div>
      </form>
    </div>
  );
}

export default Login;
