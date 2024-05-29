import { ActivityContext } from "../../activityContext";
import { useContext } from "react";

function MediaBox() {
  const { activity } = useContext(ActivityContext);

  if (activity.hasMedia === "video") {
    return (
      <div className="mediaBox">
        <iframe src={activity.media} title="video" />
      </div>
    );
  }
  return (
    <div className="mediaBox">
      <img src={"/images/" + activity.media} alt="media" />
    </div>
  );
}

export default MediaBox;
