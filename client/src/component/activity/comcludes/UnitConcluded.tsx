import api from "../../../authentication/api";
import Error from "../../Error";
import CourseConcuded from "./CourseConcluded";
const { useState } = require("react");

document.addEventListener("DOMContentLoaded", () => {
  // Handle Enter key
  document.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
      const NextButton = document.querySelector<any>("#NextUnit");
      if (NextButton) NextButton.click();
    }
  });
});

function UnitConcluded(props: any) {
  const { unit } = props;

  const [error, setError] = useState(false);
  const [isCourseConcuded, setIsUnitConcuded] = useState(false);
  const [ConcludedCourse, setConcludedUnit] = useState({});

  async function handleButtonClick(event: any) {
    const action = event.target.dataset.action;
    switch (action) {
      case "back":
        window.location.replace(`/select/lesson/${unit._id}`);
        break;
      case "home":
        window.location.replace("/");
        break;
      case "next":
        const response = await api.post(`/activities/nextUnit/${unit._id}`);

        if (response.status !== 200) {
          console.log(response.message);
          return;
        }

        if (response.theme)
          // If there is a next Lesson into the unit
          return window.location.replace(`/activity/${response.theme}`);
        else if (response.course) {
          // If there is no next Lesson into the unit
          let score;

          if (response.total) score = response.total + "%";
          else score = "NaN";

          const courseWithScore = response.course;
          courseWithScore.score = score;
          setConcludedUnit(courseWithScore);
          setIsUnitConcuded(true);
          return;
        }

        // If error
        else return setError(true);

        break;
    }
  }

  if (isCourseConcuded) return <CourseConcuded course={ConcludedCourse} />;

  if (error) return <Error />;

  return (
    <div className="UnitConcluded">
      <h1>Unit Concluded</h1>

      <div className="Concluded ClassConcuded">
        <h3 className="text-success">Congratulations!</h3>
        <h3>{unit.name}</h3>
        <p>Score : {unit.score}</p>
      </div>
      <div className="ConcludedButtons">
        <button
          className="btn btn-success"
          data-action="back"
          onClick={handleButtonClick}
        >
          &#8592; Back to Unit
        </button>
        <button
          className="btn btn-success"
          data-action="home"
          onClick={handleButtonClick}
        >
          Home
        </button>
        <button
          id="NextUnit"
          className="btn btn-success"
          data-action="next"
          onClick={handleButtonClick}
        >
          Next &#8594;
        </button>
      </div>
    </div>
  );
}

export default UnitConcluded;
