import { useState } from "react";
import api from "../../authentication/api";
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

  function RegisterFunction(event: any) {
    event.preventDefault();

    api.post("/authorization/register", user);
  }
  return (
    <div className="authForm">
      <h1>Register</h1>
      <hr />
      <form className="form-group" onSubmit={RegisterFunction}>
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

        <div className="footer">
          <p>
            Already registered? <i onClick={() => setpath("/login")}>Login</i>
          </p>

          <button type="submit" className="btn btn-primary">
            Register
          </button>
        </div>
      </form>
    </div>
  );
}

export default Register;
