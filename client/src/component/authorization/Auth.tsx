import Login from "./Login";
import Register from "./Register";
import { useState } from "react";

function Auth() {
  const [path, setPath] = useState(window.location.pathname);

  if (path === "/register") {
    return <div className="LoginMain">{<Register setpath={setPath} />}</div>;
  } else {
    return <div className="LoginMain">{<Login setpath={setPath} />}</div>;
  }
}

export default Auth;
