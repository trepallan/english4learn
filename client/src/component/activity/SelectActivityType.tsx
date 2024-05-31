import ReadType from "./types/ReadType";
import QuizType from "./types/QuizType";
import Multioption from "./types/Multioption";
import Concentration from "./types/Concentration";
import SpellingTyte from "./types/SpellingType";
import { ActivityContext } from "./activityContext";
import { useContext } from "react";

function SelectActivityType() {
  const { activity } = useContext(ActivityContext);

  switch (activity.type) {
    case "concentration":
      return <Concentration />;
    case "mutioption": // TODO change to Multioption
      return <Multioption />;
    case "quiz":
      return <QuizType />;
    case "read":
      return <ReadType />;
    case "pronunciation":
      return <div>SelectActivityType</div>;
    case "spelling":
      return <SpellingTyte />;
    case "selectImage":
      return <div>SelectActivityType</div>;
    default:
      return <div> Something went wrong </div>;
  }
}

export default SelectActivityType;
