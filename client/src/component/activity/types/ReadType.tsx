import MediaBox from "./div/MediaBox";
import TextDiv from "./div/TextDiv";
import TableDiv from "./div/TableDiv";
import AudioDiv from "./div/AudioDiv";
import HeaderDiv from "./div/HeaderDiv";
import { ActivityContext } from "../activityContext";
import { useContext } from "react";

function ReadType() {
  const { activity, setIsAnswered } = useContext(ActivityContext);
  const hascontent = activity.hasMedia || activity.text || activity.table;
  setIsAnswered(true);

  return (
    <>
      {activity.header && <HeaderDiv />}

      {hascontent && (
        <div className="ActivityContent">
          {activity.hasMedia && <MediaBox />}
          {activity.text && <TextDiv />}
          {activity.table && <TableDiv />}
        </div>
      )}
      {activity.audio && <AudioDiv />}
    </>
  );
}

export default ReadType;
