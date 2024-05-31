import { ActivityContext } from "../activityContext";
import { useContext } from "react";

function Concentration() {
  const { activity } = useContext(ActivityContext);
  console.log(activity);
  return <></>;
}

export default Concentration;
