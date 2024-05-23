import { useState, useEffect } from "react";
import "../css/Home.css";

function Home() {
  const [data, setData] = useState([]);

  useEffect(() => {});
  return (
    <div className="container Home">
      <h1>Welcome to english4learn</h1>
      <p>Welcome to the English class</p>

      <div className="startActivity">
        <button type="button" className="btn btn-success btn-lg">
          start now
        </button>

        <hr />
        <p>Or</p>

        <a href="/select-unit">Select Unit</a>
      </div>
    </div>
  );
}

export default Home;
