import AudioDiv from "./div/AudioDiv";
import MediaBox from "./div/MediaBox";
import TextDiv from "./div/TextDiv";
import TableDiv from "./div/TableDiv";
import { ActivityContext } from "../activityContext";
import { useContext, useEffect, useState } from "react";

function SpellingTyte() {
  const { activity, score, setIsAnswered } = useContext(ActivityContext);

  const [hasMisatake, setHasMistake] = useState(false);
  const [answer, setAnswer] = useState("");
  const [guess, setGuess] = useState("");
  const [chances, setChances] = useState(6);
  const [hascontent, setHascontent] = useState(false);

  useEffect(() => {
    setAnswer(activity.answer);
    setHascontent(activity.hasMedia || activity.text || activity.table);
    setHasMistake(false);
    setChances(6);
    document.querySelector(".correctanswer")?.classList.add("hidden");
    document.querySelector(".wronganswer")?.classList.add("hidden");

    return () => {
      setAnswer("");
      setGuess("");
      document.querySelector(".spellingInput")?.removeAttribute("disabled");
    };
  }, [activity]);

  function updateGuess(event: any) {
    event.preventDefault();

    const currentGuess = event.target.value;

    if (currentGuess === answer) {
      setIsAnswered(true);
      setGuess(currentGuess);
      score.current.correct += 1;
      score.current.total += 1;
      document
        .querySelector(".spellingInput")
        ?.setAttribute("disabled", "disabled");
      document.querySelector(".correctanswer")?.classList.remove("hidden");
    } else {
      let ignoredMistakes = false;
      let hasWorngChar = false;
      currentGuess.split("").forEach((letter: string, index: number) => {
        if (answer[index] !== letter) {
          hasWorngChar = true;
          if (index !== currentGuess.length - 1) ignoredMistakes = true;
        }
      });

      if (ignoredMistakes) {
        setHasMistake(true);
        return;
      } else {
        setHasMistake(false);
      }

      if (hasMisatake) return;

      // no update in case of for backspace
      if (currentGuess.length === guess.length + 1) {
        if (hasWorngChar) {
          if (chances === 0) {
            setGuess(currentGuess);
            setIsAnswered(true);
            score.current.total += 1;
            document
              .querySelector(".spellingInput")
              ?.setAttribute("disabled", "disabled");

            document.querySelector(".wronganswer")?.classList.remove("hidden");
            return;
          }

          setChances((chance) => chance - 1);
        }
        setGuess(currentGuess);
      } else if (currentGuess.length === guess.length - 1)
        setGuess(currentGuess);
    }
  }

  return (
    <>
      {hascontent && (
        <div className="ActivityContent">
          {activity.hasMedia && <MediaBox />}
          {activity.text && <TextDiv />}
          {activity.table && <TableDiv />}
        </div>
      )}
      {activity.audio && <AudioDiv />}

      <div className="spelling">
        {/* Map each letter */}
        <p className="spellingWord">
          {answer.split("").map((letter, index) => {
            // Check if the letter is a space
            if (letter === " ") {
              return (
                <span key={index} className="blankspot">
                  {"  "}
                </span>
              );
            } else {
              // Determine the class name based on the letter match
              const className =
                guess[index] === answer[index]
                  ? "text-success"
                  : hasMisatake
                  ? "inputhasmistake"
                  : "text-danger";

              return (
                <strong key={index}>
                  {guess[index] ? (
                    <span className={className}>{guess[index]}</span>
                  ) : (
                    <span>&#9824;</span>
                  )}
                </strong>
              );
            }
          })}
        </p>

        <p>
          <strong>Chances: {chances}</strong>
        </p>
        <input
          type="text"
          onChange={updateGuess}
          className="form-control spellingInput"
          placeholder="Spell it!"
          autoComplete="off"
          maxLength={hasMisatake ? guess.length : answer.length}
          value={guess}
        />
        <hr />
      </div>

      {/* Alert */}
      <div className="correctanswer">
        <div className="alert alert-success d-flex align-items-center">
          <div className="text-success">
            <strong>Correct answer!</strong>
          </div>
        </div>
      </div>

      <div className="wronganswer">
        <div className="alert alert-danger d-flex align-items-center">
          <div className="text-danger">
            Wrong answer! the correct answer is{" "}
            <strong>{activity.answer}</strong>
          </div>
        </div>
      </div>
    </>
  );
}

export default SpellingTyte;
