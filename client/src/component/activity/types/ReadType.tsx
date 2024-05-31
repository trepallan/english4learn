import MediaBox from "./div/MediaBox";
import TextDiv from "./div/TextDiv";
import TableDiv from "./div/TableDiv";
import AudioDiv from "./div/AudioDiv";
import HeaderDiv from "./div/HeaderDiv";
import { ActivityContext } from "../activityContext";
import { useContext, useEffect, useState } from "react";

function ReadType() {
  const { activity, isAnswered, setIsAnswered } = useContext(ActivityContext);
  const [hascontent, setHascontent] = useState(false);

  useEffect(() => {
    setHascontent(activity.hasMedia || activity.text || activity.table);
  }, [activity]);

  useEffect(() => {
    setIsAnswered(true);
  }, [isAnswered, setIsAnswered]);

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
