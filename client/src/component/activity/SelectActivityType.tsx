import ReadType from "./types/ReadType";
import QuizType from "./types/QuizType";
import { ActivityContext } from "./activityContext";
import { useContext } from "react";

function SelectActivityType() {
  const { activity } = useContext(ActivityContext);

  switch (activity.type) {
    case "concentration":
      return <div>SelectActivityType</div>;
    case "mutioption":
      return <div>SelectActivityType</div>;
    case "quiz":
      return <QuizType />;
    case "read":
      return <ReadType />;
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
