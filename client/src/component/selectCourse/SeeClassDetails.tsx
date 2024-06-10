import { useState, useEffect } from "react";
import api from "../../authentication/api";

interface Details {
  done: number;
  score: number;
}

function SeeDetails(props: any) {
  const { dataToShow, type, setShow } = props;

  const [details, setDetails] = useState<Details>({
    done: 0,
    score: 0,
  });

  useEffect(() => {
    (async () => {
      const response = await api.get(
        "/activities/get_info/" +
          type +
          "/" +
          dataToShow._id +
          "/" +
          dataToShow?.theme_count
      );
      if (response.status !== 200) {
        console.log(response.message);
        return;
      }
      setDetails(response.data);
    })();
  }, [dataToShow]);

  return (
    <>
      <div className="seeDetailsPopup">
        <div className="setShowToFalse" onClick={() => setShow(false)} />
        <div className="seeDetailsDiv">
          <span className="closeBtn" onClick={() => setShow(false)}>
            <svg
              aria-hidden="true"
              className="m0 svg-icon iconClear"
              width="18"
              height="18"
              viewBox="0 0 18 18"
            >
              <path d="M15 4.41 13.59 3 9 7.59 4.41 3 3 4.41 7.59 9 3 13.59 4.41 15 9 10.41 13.59 15 15 13.59 10.41 9 15 4.41Z"></path>
            </svg>
          </span>

          <h1>{dataToShow.name}</h1>

          <p>
            <strong>Done:</strong> {details.done}%
          </p>
          <p>
            <strong>Score:</strong>{" "}
            {details.score ? details.score + "%" : "N/A"}
          </p>

          <p>
            <strong>Type:</strong> {type}
          </p>
        </div>
      </div>
    </>
  );
}

export default SeeDetails;
