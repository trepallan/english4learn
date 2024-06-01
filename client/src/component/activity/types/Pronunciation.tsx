import MediaBox from "./div/MediaBox";
import TextDiv from "./div/TextDiv";
import TableDiv from "./div/TableDiv";
import AudioDiv from "./div/AudioDiv";
import HeaderDiv from "./div/HeaderDiv";
import { ActivityContext } from "../activityContext";
import { useContext, useEffect, useState } from "react";
import ReactMarkdown from "react-markdown";
import recordIcon from "../../../icons/mic.svg";
import recordingIcon from "../../../icons/stop-fill (1).svg";

function PronunciationActivityComponent() {
  const { activity, setIsAnswered } = useContext(ActivityContext);
  const [hascontent, setHascontent] = useState(false);

  useEffect(() => {
    setHascontent(activity.hasMedia || activity.text || activity.table);
  }, [activity, setIsAnswered]);

  const record = document.querySelector<any>(".record");
  const stop = document.querySelector<any>(".stop");
  const soundClips = document.querySelector<any>(".sound-clips");

  if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
    console.log("getUserMedia supported.");
    navigator.mediaDevices
      .getUserMedia(
        // constraints - only audio needed for this app
        {
          audio: true,
        }
      )

      // Success callback
      .then((stream) => {
        const mediaRecorder = new MediaRecorder(stream);

        record.onclick = () => {
          mediaRecorder.start();
          console.log(mediaRecorder.state);
          console.log("recorder started");
          record.classList.add("hidden");
          stop.classList.remove("hidden");
        };

        let chunks: any[] = [];

        mediaRecorder.ondataavailable = (e) => {
          chunks.push(e.data);
        };

        stop.onclick = () => {
          mediaRecorder.stop();
          record.classList.remove("hidden");
          stop.classList.add("hidden");
        };

        mediaRecorder.onstop = (e) => {
          console.log(mediaRecorder.state);
          console.log("recorder stopped");
          const blob = new Blob(chunks, { type: "audio/ogg; codecs=opus" });
          const audioUrl = URL.createObjectURL(blob);
          const audio = new Audio(audioUrl);
          audio.controls = true;
          audio.autoplay = false;
          soundClips.innerHTML = "";
          soundClips.appendChild(audio);
          setIsAnswered(true);
        };
      })

      // Error callback
      .catch((err) => {
        console.error(`The following getUserMedia error occurred: ${err}`);
      });
  } else {
    console.log("getUserMedia not supported on your browser!");
  }

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
      <div className="pronunciationAudios">
        {activity.audio && <AudioDiv />}
        <div className="sound-clips"></div>
      </div>

      <div className="pronunciation">
        <h6>
          <ReactMarkdown>{activity.header}</ReactMarkdown>
        </h6>
        <div className="pronunciation-buttons">
          <button className="record">
            <img src={recordIcon} alt="" />
          </button>
          <button className="stop hidden">
            <img src={recordingIcon} alt="" />
          </button>
        </div>
      </div>
    </>
  );
}

export default PronunciationActivityComponent;
