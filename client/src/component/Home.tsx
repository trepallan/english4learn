import "../css/Home.css";
import api from "../authentication/api";
import ErrorHandler from "./Error";
import { useState } from "react";
import Loading from "./Loading";
import isLoged from "../utils/isLoged";

function Home() {
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);

  async function GoToNextActivity() {
    if (!isLoged()) return window.location.replace("/login");
    setLoading(true);
    const response = await api.get("/activities/next");
    if (response.status !== 200) {
      console.log(response.message);
      setError(true);
      return;
    }
    if (response.theme)
      // If there is a next Activity
      return window.location.replace(`/activity/${response.theme}`);
    else setError(true);
  }

  if (error) return <ErrorHandler />;

  if (loading) return <Loading />;

  return (
    <div className="container Home">
      <h1>Welcome to english4learn</h1>
      <p>Welcome to the English class</p>

      <div className="startActivity">
        {!isLoged() && (
          <strong className="text-muted">
            You must <a href="/login">log in</a> to continue
          </strong>
        )}
        <hr />

        <button
          type="button"
          onClick={GoToNextActivity}
          className="btn btn-success btn-lg"
        >
          Go to next activity
        </button>

        <hr />
        <p>Or</p>

        <a href="/select">Select Course</a>
      </div>
    </div>
  );
}

export default Home;
