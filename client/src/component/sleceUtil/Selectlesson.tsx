import { useState, useEffect } from "react";
import api from "../../authentication/api";
import { useParams } from "react-router-dom";

function Selectlesson() {
  const unit_id = useParams().id;
  const [lessons, setLessons] = useState([]);

  useEffect(() => {
    (async () => {
      const response = await api.get(`/units/${unit_id}/lessons`);
      setLessons(response);
    })();
  }, []);

  return (
    <>
      <></>
    </>
  );
}

export default Selectlesson;
