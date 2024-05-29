import MediaBox from "./div/MediaBox";
import TextDiv from "./div/TextDiv";
import TableDiv from "./div/TableDiv";
import AudioDiv from "./div/AudioDiv";

function QuizType(props: any) {
  const { activity, score, setIsAnswered } = props;
  const hascontent = activity.hasMedia || activity.text || activity.table;

  function checkAnswer(event: any) {
    event.preventDefault();

    const allButtons = document.querySelectorAll(".option");
    allButtons.forEach((button) => {
      button.classList.add("disabled");
    });

    if (event.target.value === "true") {
      event.target.classList = "btn btn-success disabled option";

      score.current.correct += 1;
      score.current.total += 1;
    } else {
      event.target.classList = "btn btn-danger disabled option";
      score.current.total += 1;
      allButtons.forEach((button: any) => {
        if (button.value === "true") {
          button.classList = "btn btn-success disabled option";
        }
      });
    }

    console.log(score);
    setIsAnswered(true);
  }

  console.log(activity);
  return (
    <>
      {hascontent && (
        <div className="ActivityContent">
          {activity.hasMedia && <MediaBox activity={activity} />}
          {activity.text && <TextDiv activity={activity} />}
          {activity.table && <TableDiv activity={activity} />}
        </div>
      )}

      <div className="activityQuiz">
        {activity.header && <h6>{activity.header}</h6>}
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

        {activity.audio && <AudioDiv activity={activity} />}
      </div>
    </>
  );
}

export default QuizType;
