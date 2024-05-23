import AppRouter from "./routes/routes";
import logo from "./icons/logo-half-moon.png";
import "./App.css";
function App() {
  return (
    <div className="MainApp">
      <img className="App-logo" src={logo} alt="logo" />
      <AppRouter />
    </div>
  );
}

export default App;
