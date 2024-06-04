import { ActivityContext } from "../../activityContext";
import { useContext } from "react";
import { useState } from "react";

function MediaBox() {
  const { activity } = useContext(ActivityContext);
  const [isLoading, setIsLoading] = useState(true);

  if (activity.hasMedia === "video") {
    return (
      <div className="mediaBox">
        <iframe
          src={activity.media}
          title="video"
          onLoad={() => setIsLoading(false)}
        />
        {isLoading && (
          <div
            className="spinner-grow text-success activityIsLoading"
            role="status"
          >
            <span className="visually-hidden" />
          </div>
        )}
      </div>
    );
  }
  return (
    <div className="mediaBox">
      <img
        className="mediaBoxImg"
        src={"/images/" + activity.media}
        alt="media"
        onLoad={() => setIsLoading(false)}
      />

      {isLoading && (
        <div
          className="spinner-grow text-success activityIsLoading"
          role="status"
        >
          <span className="visually-hidden" />
        </div>
      )}
    </div>
  );
}

export default MediaBox;
