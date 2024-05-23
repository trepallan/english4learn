import { useState } from "react";
import api from "../../authentication/api";
import logUser from "../../utils/logUser";
import "../../css/auth.css";

interface User {
  username: string;
  password: string;
  confirmPassword: string;
  email: string;
}

function Register({ setpath }: any) {
  const [user, setUser] = useState<User>({
    username: "",
    password: "",
    confirmPassword: "",
    email: "",
  });
  const [message, setMessage] = useState<string>("");

  async function RegisterFunction(event: any) {
    event.preventDefault();

    if (
      user.username === "" ||
      user.email === "" ||
      user.password === "" ||
      user.confirmPassword === ""
    ) {
      setMessage("All fields are required");
      return;
    }

    if (user.password !== user.confirmPassword) {
      setMessage("Passwords do not match");
      return;
    }

    const response = await api.post("/authorization/register", user);
    if (response.status !== 201) {
      console.log(response);
      setMessage(response.message);
      return;
    }

    logUser(response);
    window.location.href = "/";
  }

  return (
    <div className="authForm">
      <h1>Register</h1>
      <hr />
      <form className="form-group" onSubmit={RegisterFunction}>
        <label htmlFor="username">Username</label>
        <input
          type="text"
          autoComplete="new-username"
          required
          className="form-control"
          id="username"
          value={user.username}
          onChange={(e) => setUser({ ...user, username: e.target.value })}
        />

        <label htmlFor="email">Email</label>
        <input
          type="email"
          className="form-control"
          required
          autoComplete="new-email"
          id="email"
          value={user.email}
          onChange={(e) => setUser({ ...user, email: e.target.value })}
        />

        <label htmlFor="password">Password</label>
        <input
          type="password"
          className="form-control"
          required
          autoComplete="new-password"
          id="password"
          value={user.password}
          onChange={(e) => setUser({ ...user, password: e.target.value })}
        />

        <label htmlFor="confirmPassword">Confirm Password</label>
        <input
          type="password"
          autoComplete="new-password"
          className="form-control"
          id="confirmPassword"
          required
          value={user.confirmPassword}
          onChange={(e) =>
            setUser({ ...user, confirmPassword: e.target.value })
          }
        />

        <div className="footer">
          <p>
            Already registered? <i onClick={() => setpath("/login")}>Login</i>
          </p>

          {message && <div className="alert alert-danger">{message}</div>}

          <button type="submit" className="btn btn-primary btn-lg">
            Register
          </button>
        </div>
      </form>
    </div>
  );
}

export default Register;
