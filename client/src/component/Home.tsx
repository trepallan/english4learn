import "../css/Home.css";

function Home() {
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

        <a href="/select">Select Course</a>
      </div>
    </div>
  );
}

export default Home;
