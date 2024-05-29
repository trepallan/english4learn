import { ActivityContext } from "../../activityContext";
import { useContext } from "react";

function AudioDiv() {
  const { activity } = useContext(ActivityContext);
  return (
    <div className="AudioDiv">
      <audio src={"/audio/" + activity.audio} controls />
    </div>
  );
}

export default AudioDiv;
