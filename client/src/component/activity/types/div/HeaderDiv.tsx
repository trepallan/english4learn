import { ActivityContext } from "../../activityContext";
import { useContext } from "react";
import he from "he";

function HeaderDiv() {
  const { activity } = useContext(ActivityContext);
  const html = he.decode(activity.header);
  return (
    <>
      <div className="activityHeader">
        <h4 dangerouslySetInnerHTML={{ __html: html }}></h4>
      </div>
    </>
  );
}

export default HeaderDiv;
