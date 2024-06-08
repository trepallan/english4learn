import MediaBox from "./div/MediaBox";
import TextDiv from "./div/TextDiv";
import TableDiv from "./div/TableDiv";
import AudioDiv from "./div/AudioDiv";
import { ActivityContext } from "../activityContext";
import { useContext, useEffect, useState } from "react";

function Multioption() {
  const { activity, score, setIsAnswered } = useContext(ActivityContext);

  const [hits, setHits] = useState(0);
  const [hascontent, setHascontent] = useState(false);
  const [answersCount, setAnswersCount] = useState(0);

  function checkout(correct: boolean) {
    document.querySelectorAll(".option").forEach((option: any) => {
      option.classList.add("disabled");
    });

    if (correct) {
      score.current.correct += 1;
      score.current.total += 1;
      document.querySelector(".correctanswer")?.classList.remove("hidden");
    } else {
      score.current.total += 1;
      document.querySelector(".wronganswer")?.classList.remove("hidden");

      document.querySelectorAll(".option").forEach((option: any) => {
        if (option.value === "true") {
          option.classList = "btn btn-success disabled option";
        }
      });
    }
    setIsAnswered(true);
  }

  //  Count the number of correct answers
  useEffect(() => {
    const optionButtons = document.querySelectorAll(".option");
    optionButtons.forEach((button: any) => {
      button.classList = "btn btn-outline-dark option";
    });

    document.querySelector(".correctanswer")?.classList.add("hidden");
    document.querySelector(".wronganswer")?.classList.add("hidden");

    setHits(0);
    let i = 0;
    const options = activity.options;
    options.forEach((option: any) => {
      if (option.is_correct === true) i++;
    });

    setHascontent(activity.hasMedia || activity.text || activity.table);
    setAnswersCount(i);

    setIsAnswered(false);
  }, [activity, setIsAnswered]);

  function checkOption(event: any) {
    event.preventDefault();

    if (event.target.value === "true")
      event.target.classList = "btn btn-success disabled option";
    else {
      event.target.classList = "btn btn-danger disabled option";
      return checkout(false);
    }
    setHits((hit) => hit + 1);

    const correct = document.querySelectorAll(".btn-success");

    if (correct.length === answersCount) return checkout(true);
    if (hits === answersCount) return checkout(false);
  }

  return (
    <>
      {hascontent && (
        <div className="ActivityContent">
          {activity.hasMedia && <MediaBox />}
          {activity.text && <TextDiv />}
          {activity.table && <TableDiv />}
        </div>
      )}
      {activity.audio && <AudioDiv />}

      <div className="multioption">
        <h6>Select the {answersCount} correct answers</h6>
        {activity.options.map((option: any) => (
          <button
            className="btn btn-outline-dark option"
            key={option.id}
            onClick={checkOption}
            value={option.is_correct}
          >
            {option.text}
          </button>
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

export default Multioption;
