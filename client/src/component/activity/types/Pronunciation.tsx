import MediaBox from "./div/MediaBox";
import TextDiv from "./div/TextDiv";
import TableDiv from "./div/TableDiv";
import AudioDiv from "./div/AudioDiv";
import HeaderDiv from "./div/HeaderDiv";
import { ActivityContext } from "../activityContext";
import { useContext, useEffect, useState } from "react";
import recordIcon from "../../../icons/mic.svg";
import recordingIcon from "../../../icons/stop-fill (1).svg";

function PronunciationActivityComponent() {
  const { activity, setIsAnswered } = useContext(ActivityContext);
  const [hascontent, setHascontent] = useState(false);

  useEffect(() => {
    setHascontent(activity.hasMedia || activity.text || activity.table);
  }, [activity, setIsAnswered]);

  useEffect(() => {
    const record = document.querySelector<any>(".record");
    const stop = document.querySelector<any>(".stop");
    const soundClips = document.querySelector<any>(".sound-clips");

    if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
      (async () => {
        try {
          const stream = await navigator.mediaDevices.getUserMedia(
            // constraints - only audio needed for this app
            {
              audio: true,
            }
          );

          // Success callback
          const mediaRecorder = new MediaRecorder(stream);

          record.onclick = () => {
            mediaRecorder.start();
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

          mediaRecorder.onstop = async (e) => {
            const blob = new Blob(chunks, { type: "audio/ogg; codecs=opus" });
            // Append the chunks to the end of the audioFile
            const url = URL.createObjectURL(blob);
            const audio = new Audio(url);
            audio.controls = true;
            audio.autoplay = false;

            chunks = []; // clear chunks
            soundClips.innerHTML = "";
            soundClips.appendChild(audio);
            setIsAnswered(true);
          };
        } catch (error) {
          console.log(error);
        }
      })();
    } else {
      console.log("getUserMedia not supported on your browser!");
    }
  }, [setIsAnswered]);

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
