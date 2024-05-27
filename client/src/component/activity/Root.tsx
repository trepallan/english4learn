import { useState, useEffect } from "react";
import SelectActivityType from "./SelectActivityType";
import { useParams } from "react-router-dom";
import api from "../../authentication/api";
import "../../css/activityRoot.css";

function ActivityRoot() {
  const [isLoading, setIsLoading] = useState(true);
  const [activities, setActivities] = useState([]);
  const [message, setMessage] = useState("");
  const [index, setIndex] = useState(0);
  const themeId = useParams().themeId;
  if (!themeId) setMessage("Something went wrong");

  function handleNext() {
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
        <div className="activityWrapper p-3 mb-2 bg-success-subtle text-success-emphasis">
          <SelectActivityType activity={activities[index]} />
        </div>
      )}

      <div className="activityFooter">
        <button onClick={handleNext}>Next</button>
      </div>
    </div>
  );
}

export default ActivityRoot;
