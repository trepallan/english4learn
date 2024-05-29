import ReactMarkdown from "react-markdown";
import { ActivityContext } from "../../activityContext";
import { useContext } from "react";

function TextDiv() {
  const { activity } = useContext(ActivityContext);

  return (
    <>
      <div className="activityText">
        <ReactMarkdown>{activity.text}</ReactMarkdown>
      </div>
    </>
  );
}

export default TextDiv;
