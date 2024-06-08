import "../css/Error.css";

const message = "): Page Not Found";
function ErrorHandler() {
  return (
    <div className="errorAbsolute">
      <h1>404</h1>
      <hr />
      <h3>{message}</h3>
    </div>
  );
}

export default ErrorHandler;
