import ReactMarkdown from "react-markdown";
import { ActivityContext } from "../../activityContext";
import { useContext } from "react";

function HeaderDiv() {
  const { activity } = useContext(ActivityContext);
  return (
    <>
      <div className="activityHeader">
        <h4>
          <ReactMarkdown>{activity.header}</ReactMarkdown>
        </h4>
      </div>
    </>
  );
}

export default HeaderDiv;
