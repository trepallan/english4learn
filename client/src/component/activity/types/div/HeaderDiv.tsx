import { ActivityContext } from "../../activityContext";
import { useContext } from "react";
import decode from "./decode";

function HeaderDiv() {
  const { activity } = useContext(ActivityContext);
  const html = decode(activity.header);
  return (
    <>
      <div className="activityHeader">
        <h2 dangerouslySetInnerHTML={{ __html: html }}></h2>
      </div>
    </>
  );
}

export default HeaderDiv;
