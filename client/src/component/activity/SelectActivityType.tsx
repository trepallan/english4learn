import ReadType from "./types/ReadType";
import QuizType from "./types/QuizType";

function SelectActivityType(props: any) {
  const { activity, score, setIsAnswered } = props;

  switch (activity.type) {
    case "concentration":
      return <div>SelectActivityType</div>;
    case "mutioption":
      return <div>SelectActivityType</div>;
    case "quiz":
      return (
        <QuizType
          activity={activity}
          score={score}
          setIsAnswered={setIsAnswered}
        />
      );
    case "read":
      setIsAnswered(true);
      return <ReadType activity={activity} />;
    case "pronunciation":
      return <div>SelectActivityType</div>;
    case "spelling":
      return <div>SelectActivityType</div>;
    case "listen":
      return <div>SelectActivityType</div>;
    case "vocabulary":
      return <div>SelectActivityType</div>;
    case "selectImage":
      return <div>SelectActivityType</div>;
    default:
      return <div>SelectActivityType</div>;
  }
}

export default SelectActivityType;
