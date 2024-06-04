import ReadType from "./types/ReadType";
import QuizType from "./types/QuizType";
import Multioption from "./types/Multioption";
import Concentration from "./types/Concentration";
import SpellingTyte from "./types/SpellingType";
import SelectImage from "./types/SelectImage";
import { ActivityContext } from "./activityContext";
import { useContext } from "react";
import PronunciationActivity from "./types/Pronunciation";

function SelectActivityType() {
  const { activity } = useContext(ActivityContext);
  switch (activity.type) {
    case "concentration":
      return <Concentration key={activity._id} />;
    case "multioption":
      return <Multioption key={activity._id} />;
    case "quiz":
      return <QuizType key={activity._id} />;
    case "read":
      return <ReadType key={activity._id} />;
    case "pronunciation":
      return <PronunciationActivity key={activity._id} />;
    case "spelling":
      return <SpellingTyte key={activity._id} />;
    case "selectImage":
      return <SelectImage key={activity._id} />;
    default:
      return <div> Something went wrong </div>;
  }
}

export default SelectActivityType;
