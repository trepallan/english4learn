import { ActivityContext } from "../../activityContext";
import { useContext } from "react";
import decode from "./decode";

function TextDiv() {
  const { activity } = useContext(ActivityContext);
  const html: any = decode(activity.text);

  // Unescape the HTML entities

  return (
    <div
      className="activityText"
      dangerouslySetInnerHTML={{ __html: html }}
    ></div>
  );
}

export default TextDiv;
