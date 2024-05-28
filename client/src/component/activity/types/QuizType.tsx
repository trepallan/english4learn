import MediaBox from "./div/MediaBox";
import TextDiv from "./div/TextDiv";
import TableDiv from "./div/TableDiv";
import AudioDiv from "./div/AudioDiv";
import HeaderDiv from "./div/HeaderDiv";

function QuizType(props: any) {
  const { activity } = props;
  const hascontent = activity.hasMedia || activity.text || activity.table;

  console.log(activity);
  return (
    <>
      {activity.header && <HeaderDiv activity={activity} />}

      {hascontent && (
        <div className="ActivityContent">
          {activity.hasMedia && <MediaBox activity={activity} />}
          {activity.text && <TextDiv activity={activity} />}
          {activity.table && <TableDiv activity={activity} />}
        </div>
      )}

      <div className="quizOptions">
        {activity.options.map((option: any, index: number) => (
          <button
            type="button"
            className="btn btn-outline-secondary"
            key={index}
          >
            {option.text}
          </button>
        ))}
      </div>

      {activity.audio && <AudioDiv activity={activity} />}
    </>
  );
}

export default QuizType;
