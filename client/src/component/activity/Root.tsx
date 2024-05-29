import { useState, useEffect, useRef } from "react";
import SelectActivityType from "./SelectActivityType";
import { useParams } from "react-router-dom";
import api from "../../authentication/api";
import "../../css/activity.css";

interface score {
  correct: number;
  total: number;
}

function ActivityRoot() {
  const [isLoading, setIsLoading] = useState(true);
  const [isAnswered, setIsAnswered] = useState(false);
  const [activities, setActivities] = useState([]);
  const [message, setMessage] = useState("");
  const [index, setIndex] = useState(0);
  const themeId = useParams().themeId;
  if (!themeId) setMessage("Something went wrong");
  const score = useRef<score>({ correct: 0, total: 0 }); //Track user score

  useEffect(() => {
    if (!isAnswered) {
      const optionButtons = document.querySelectorAll(".option");
      optionButtons.forEach((button: any) => {
        button.classList = "btn btn-outline-dark option";
      });
    }
  }, [isAnswered]);

  if (isAnswered)
    document.querySelector(".activityFooter")?.classList.remove("hidden");
  else document.querySelector(".activityFooter")?.classList.add("hidden");

  function handleNext() {
    setIsAnswered(false);
    if (index + 1 >= activities.length) setMessage("No more activities"); // TODO: display user score
    setIndex((prevIndex) => (prevIndex + 1) % activities.length);
  }

  useEffect(() => {
    (async () => {
      if (!themeId) return;

      const response = await api.get(`/activities/${themeId}`);
      if (response.status !== 200) setMessage(response.message);

      setActivities(response.data);
      setIsLoading(false);
    })();
  }, [themeId]);

  // Spinner if loading
  if (isLoading)
    return (
      <div
        className="spinner-grow text-success activityIsLoading"
        role="status"
      >
        <span className="visually-hidden" />
      </div>
    );

  // Error message
  if (message) return <h1>{message}</h1>;

  // Display activities
  return (
    <div className="activityRoot container">
      {activities && (
        <div className="activityWrapper">
          <SelectActivityType
            activity={activities[index]}
            score={score}
            setIsAnswered={setIsAnswered}
          />
        </div>
      )}

      <div className="activityFooter hidden">
        <button onClick={handleNext}>Next</button>
      </div>
    </div>
  );
}

export default ActivityRoot;
