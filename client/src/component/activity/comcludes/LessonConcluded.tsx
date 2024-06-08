import api from "../../../authentication/api";
import Error from "../../Error";
import UnitConcuded from "../comcludes/UnitConcluded";
const { useState } = require("react");

document.addEventListener("DOMContentLoaded", () => {
  // Handle Enter key
  document.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
      const NextButton = document.querySelector<any>("#NextLesson");
      if (NextButton) NextButton.click();
    }
  });
});
function LessonConcuded(props: any) {
  const { lesson } = props;
  const [error, setError] = useState(false);
  const [isUnitConcuded, setIsUnitConcuded] = useState(false);
  const [unit, setUnit] = useState({});

  async function handleButtonClick(event: any) {
    const action = event.target.dataset.action;
    switch (action) {
      case "back":
        window.location.replace(`/select/theme/${lesson._id}`);
        break;
      case "home":
        window.location.replace("/");
        break;
      case "next":
        const response = await api.post(`/activities/nextLesson/${lesson._id}`);

        if (response.status !== 200) {
          console.log(response.message);
          return;
        }

        if (response.theme)
          // If there is a next Lesson into the unit
          return window.location.replace(`/activity/${response.theme}`);
        else if (response.unit) {
          // If there is no next Lesson into the unit
          let score;

          if (response.total) score = response.total + "%";
          else score = "NaN";

          const unitWithScore = response.unit;
          unitWithScore.score = score;
          setUnit(unitWithScore);
          setIsUnitConcuded(true);
          return;
        }
        // If error
        else return setError(true);

        break;
    }
  }

  if (isUnitConcuded) return <UnitConcuded unit={unit} />;

  if (error) return <Error />;

  return (
    <div className="LessonConcuded">
      <h1>Lesson Concluded</h1>

      <div className="Concluded ClassConcuded">
        <h3>{lesson.name}</h3>
        <p>Score : {lesson.score}</p>
      </div>
      <div className="ConcludedButtons">
        <button
          className="btn btn-success"
          data-action="back"
          onClick={handleButtonClick}
        >
          &#8592; Back to Lesson
        </button>
        <button
          className="btn btn-success"
          data-action="home"
          onClick={handleButtonClick}
        >
          Home
        </button>
        <button
          id="NextLesson"
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

export default LessonConcuded;
