import AudioDiv from "./div/AudioDiv";
import { ActivityContext } from "../activityContext";
import { useContext, useEffect, useState } from "react";
import he from "he";

function SelectImage() {
  const { activity, score, setIsAnswered } = useContext(ActivityContext);
  const [hasSelected, setHasSelected] = useState(false);

  useEffect(() => {
    document.querySelectorAll(".imgoption").forEach((option: any) => {
      option.classList = "figure-img img-fluid rounded imgoption";
    });
    document.querySelector(".correctanswer")?.classList.add("hidden");
    document.querySelector(".wronganswer")?.classList.add("hidden");
    setHasSelected(false);
  }, [activity]);

  function handleClick(event: any) {
    if (hasSelected) return;

    setHasSelected(true);
    event.target.classList.toggle("selected");

    if (event.target.dataset.value === "true") {
      score.current.correct += 1;
      score.current.total += 1;
      document.querySelector(".correctanswer")?.classList.remove("hidden");
    } else {
      score.current.total += 1;
      document.querySelector(".wronganswer")?.classList.remove("hidden");
    }
    document.querySelectorAll(".imgoption").forEach((option: any) => {
      option.classList.add("selected");
      if (option.dataset.value === "true") option.classList.add("correctImage");
      else option.classList.add("incorrectImage");
    });

    setIsAnswered(true);
  }

  return (
    <>
      {activity.header && (
        <h5>
          <span
            dangerouslySetInnerHTML={{ __html: he.decode(activity.header) }}
          ></span>
        </h5>
      )}

      {activity.audio && <AudioDiv />}

      <div className="ActivityContent">
        {activity.options.map((option: any) => (
          <figure className="figure" key={option.text}>
            <img
              onClick={handleClick}
              data-value={option.is_correct}
              src={"/images/" + option.text}
              className="figure-img img-fluid rounded imgoption"
              alt="..."
            />
          </figure>
        ))}
      </div>

      {/* Alert */}
      <div className="correctanswer">
        <div className="alert alert-success d-flex align-items-center">
          <div className="text-success">
            <strong>Correct answer!</strong>
          </div>
        </div>
      </div>

      <div className="wronganswer">
        <div className="alert alert-danger d-flex align-items-center">
          <div className="text-danger">Wrong answer!</div>
        </div>
      </div>
    </>
  );
}

export default SelectImage;
