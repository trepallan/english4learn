import { ActivityContext } from "../activityContext";
import { useContext } from "react";
import { useEffect, useState } from "react";

function Concentration() {
  const { activity, score, setIsAnswered } = useContext(ActivityContext);
  const [options, setOptions] = useState<any[]>([]);
  const [chances, setChances] = useState(3);
  const [selected, setSelected] = useState<any>("");

  useEffect(() => {
    setOptions(activity.concentration);
  }, [activity]);

  function checkout() {
    let i = 0;
    document.querySelectorAll(".concentrationOption").forEach((option: any) => {
      if (option.classList.contains("disabled")) i++; // If option is disabled it means it is correct
    });

    if (options.length === i) {
      score.current.correct += 1;
      score.current.total += 1;
      setIsAnswered(true);
      document.querySelector(".correctanswer")?.classList.remove("hidden");
    }

    if (chances === 0) {
      document
        .querySelectorAll(".concentrationOption")
        .forEach((option: any) => {
          option.classList.add("disabled");
        });
      score.current.total += 1;
      setIsAnswered(true);
      document.querySelector(".wronganswer")?.classList.remove("hidden");
    }
  }

  function HandleSelect(event: any) {
    if (event.target.classList.contains("disabled")) return;
    event.target.classList.toggle("selected");

    if (event.target.classList.contains("selected")) {
      if (selected !== "") {
        if (selected === event.target.getAttribute("data-key")) {
          document.querySelectorAll(".selected").forEach((option: any) => {
            option.classList.add("disabled");
          });
        } else {
          document.querySelectorAll(".selected").forEach((option: any) => {
            option.classList.add("wrongGuess");
          });
          setTimeout(() => {
            document.querySelectorAll(".wrongGuess").forEach((option: any) => {
              option.classList.remove("wrongGuess");
            });
          }, 4000);

          setChances((chances) => chances - 1);
        }
        setSelected("");
        document.querySelectorAll(".selected").forEach((option: any) => {
          option.classList.remove("selected");
        });
      } else {
        document.querySelectorAll(".selected").forEach((option: any) => {
          if (option !== event.target) option.classList.remove("selected");
        });
        setSelected(event.target.getAttribute("data-key"));
        return;
      }

      checkout();
    } else {
      event.target.classList.remove("selected");
      setSelected("");
    }
  }

  return (
    <>
      <h6 className="chances">Chances left: {chances}</h6>
      <div className="concentration">
        {options.map((option: any) =>
          option.IsImage ? (
            <img
              src={"/images/" + option.value}
              alt=""
              onClick={HandleSelect}
              data-key={option.key}
              key={option._id}
              className="concentrationOption"
            />
          ) : (
            <div
              key={option._id}
              data-key={option.key}
              onClick={HandleSelect}
              className="concentrationOption"
            >
              {option.value}
            </div>
          )
        )}
      </div>

      {/* Alert */}
      <div className="correctanswer hidden">
        <div className="alert alert-success d-flex align-items-center">
          <div className="text-success">
            <strong>Correct answer!</strong>
          </div>
        </div>
      </div>

      <div className="wronganswer hidden">
        <div className="alert alert-danger d-flex align-items-center">
          <div className="text-danger">Wrong answer!</div>
        </div>
      </div>
    </>
  );
}

export default Concentration;
