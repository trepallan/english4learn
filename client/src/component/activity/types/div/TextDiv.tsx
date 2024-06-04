import { ActivityContext } from "../../activityContext";
import { useContext } from "react";
import decode from "./decode";

function TextDiv() {
  const { activity } = useContext(ActivityContext);
  const html: any = decode(activity.text);

  // Chck if there is a media to change css

  const Class = activity.hasMedia
    ? "activityTextWithMedia activityText"
    : "activityText";

  return (
    <div className={Class} dangerouslySetInnerHTML={{ __html: html }}></div>
  );
}

export default TextDiv;
