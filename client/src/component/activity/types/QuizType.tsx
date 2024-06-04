import MediaBox from "./div/MediaBox";
import TextDiv from "./div/TextDiv";
import TableDiv from "./div/TableDiv";
import AudioDiv from "./div/AudioDiv";
import decode from "./div/decode";
import { useState, useEffect } from "react";
import { ActivityContext } from "../activityContext";
import { useContext } from "react";

function QuizType() {
  const { activity, score, setIsAnswered } = useContext(ActivityContext);
  const [hascontent, setHascontent] = useState(false);
  const [answer, setAnswer] = useState("");

  useEffect(() => {
    setHascontent(activity.hasMedia || activity.text || activity.table);
    const optionButtons = document.querySelectorAll(".option");
    optionButtons.forEach((button: any) => {
      button.classList = "btn btn-outline-dark option";
    });
    document.querySelector(".correctanswer")?.classList.add("hidden");
    document.querySelector(".wronganswer")?.classList.add("hidden");
    setAnswer("");
    return () => {
      setIsAnswered(false);
    };
  }, [activity, setIsAnswered]);

  function checkAnswer(event: any) {
    event.preventDefault();

    const allButtons = document.querySelectorAll(".option");
    allButtons.forEach((button) => {
      button.classList.add("disabled");
    });

    if (event.target.value === "true") {
      event.target.classList = "btn btn-success disabled option";
      document.querySelector(".correctanswer")?.classList.remove("hidden");

      score.current.correct += 1;
      score.current.total += 1;
    } else {
      event.target.classList = "btn btn-danger disabled option";
      score.current.total += 1;
      allButtons.forEach((button: any) => {
        if (button.value === "true") {
          button.classList = "btn btn-success disabled option";
          setAnswer(button.innerText);
          document.querySelector(".wronganswer")?.classList.remove("hidden");
        }
      });
    }
    setIsAnswered(true);
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

      <div className="activityQuiz">
        {activity.header && (
          <h6>
            <span
              dangerouslySetInnerHTML={{ __html: decode(activity.header) }}
            ></span>
          </h6>
        )}
        <div className="quizOptions">
          {activity.options.map((option: any, index: number) => (
            <button
              type="button"
              className="btn btn-outline-dark option"
              value={option.is_correct}
              key={index}
              onClick={checkAnswer}
            >
              {option.text}
            </button>
          ))}
        </div>

        {activity.audio && <AudioDiv />}
      </div>

      <div className="hidden correctanswer">
        <div className="alert alert-success d-flex align-items-center">
          <div className="text-success">
            <strong>Correct answer!</strong>
          </div>
        </div>
      </div>

      <div className="hidden wronganswer">
        <div className="alert alert-danger d-flex align-items-center">
          <div className="text-danger">
            Wrong answer! The correct answer is <strong>{answer}</strong>
          </div>
        </div>
      </div>
    </>
  );
}

export default QuizType;
