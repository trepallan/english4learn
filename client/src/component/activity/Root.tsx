import { useState, useEffect, useRef } from "react";
import SelectActivityType from "./SelectActivityType";
import { useParams } from "react-router-dom";
import api from "../../authentication/api";
import { ActivityContextProvider } from "./activityContext";
import "../../css/activity.css";

interface score {
  correct: number;
  total: number;
}

document.addEventListener("DOMContentLoaded", () => {
  document.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
      const footer = document.querySelector(".activityFooter");
      const NextButton = document.querySelector<any>(".NextButton");
      if (!footer?.classList.contains("disabled")) {
        NextButton?.click();
      }
    }
  });
});

function ActivityRoot() {
  const [isLoading, setIsLoading] = useState(true);
  const [isAnswered, setIsAnswered] = useState(false);
  const [activities, setActivities] = useState([]);
  const [activity, setActivity] = useState({});
  const [message, setMessage] = useState("");
  const [index, setIndex] = useState(0);
  const themeId = useParams().themeId;
  if (!themeId) setMessage("Something went wrong");
  const score = useRef<score>({ correct: 0, total: 0 }); //Track user score

  useEffect(() => {
    const activityFooter = document.querySelector(".activityFooter");
    if (isAnswered) {
      activityFooter?.classList.remove("hidden");
      activityFooter?.classList.remove("disabled");
    } else {
      activityFooter?.classList.add("hidden");
      activityFooter?.classList.add("disabled");
    }
  }, [isAnswered, activity]);

  useEffect(() => {
    setActivity(activities[index]);
  }, [activities, index]);

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
      <div className="activityHeader">
        {index + 1} / {activities.length}
      </div>
      {activity && (
        <ActivityContextProvider
          isAnswered={isAnswered}
          setIsAnswered={setIsAnswered}
          score={score}
          activity={activity}
        >
          <div className="activityWrapper">
            <SelectActivityType />
          </div>
        </ActivityContextProvider>
      )}

      <div className="activityFooter">
        <button onClick={handleNext} className="NextButton">
          Next
        </button>
      </div>
    </div>
  );
}

export default ActivityRoot;
