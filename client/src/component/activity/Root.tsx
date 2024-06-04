import { useState, useEffect, useRef } from "react";
import SelectActivityType from "./SelectActivityType";
import { useParams } from "react-router-dom";
import api from "../../authentication/api";
import { ActivityContextProvider } from "./activityContext";
import "../../css/activity.css";
import LessonConcuded from "./comcludes/LessonConcuded";

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
  const [theme, setTheme] = useState<any>({});
  const [activity, setActivity] = useState<any>({});
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

  async function handleNext() {
    setIsAnswered(false);
    if (index + 1 >= activities.length) {
      //  If last activity
      let percentage = (score.current.correct / score.current.total) * 100;
      if (Number.isNaN(percentage)) percentage = 100; //  If no score
      const response = await api.post(`/activities/mark_as_done/${themeId}`, {
        percentage,
      });
      if (response.status !== 200) return setMessage(response.message);
      const hasNext = response.hasNext;
      if (!hasNext) {
        //  If lesson is finished
        const lesson = response.lesson;
        if (!lesson) return setMessage("Something went wrong");
        return <LessonConcuded lesson={lesson} />;
      }

      //  If there is a next theme
      const nextTheme = response.nextTheme;
      if (!nextTheme) return setMessage("Something went wrong");
      return window.location.replace(`/activities/${nextTheme._id}`);
    }

    //  If there is a next activity
    setIndex((prevIndex) => (prevIndex + 1) % activities.length);
  }

  useEffect(() => {
    (async () => {
      if (!themeId) return;

      const response = await api.get(`/activities/${themeId}`);
      if (response.status !== 200) setMessage(response.message);

      setActivities(response.activities);
      setTheme(response.theme);
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
      {activity && (
        <ActivityContextProvider
          isAnswered={isAnswered}
          setIsAnswered={setIsAnswered}
          score={score}
          activity={activity}
          theme={theme}
        >
          {/* Header */}
          <div className="ThemeHeader">
            <div className="BackButton">
              <a href={"/select-course/theme/" + theme.lesson}> &#8592; Back</a>
            </div>
            {theme.name} {index + 1} / {activities.length}
          </div>

          {/* Activity wrapper */}
          <div className="activityWrapper">
            <SelectActivityType />
          </div>
        </ActivityContextProvider>
      )}

      <div className="activityFooter">
        <button onClick={handleNext} className="NextButton">
          Next &#8594;
        </button>
      </div>
    </div>
  );
}

export default ActivityRoot;
