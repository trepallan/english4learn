import { useState, useEffect } from "react";
import api from "../../authentication/api";

interface Unit {
  _id: number;
  name: string;
  indice: number;
  lesson_count: number;
}

function SelectCourse() {
  const [units, setUnits] = useState<Unit[]>([]);
  const [message, setMessage] = useState("");

  useEffect(() => {
    (async () => {
      const response = await api.get("/units");
      if (response.status !== 200) {
        setMessage(response.message);
        return;
      }
      console.log(response);
      setUnits(response);
    })();
  }, []);

  return (
    <>
      <h1>Select Unit</h1>
      {message && <h1>{message}</h1>}

      <table className="table table-bordered container">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Name</th>
            <th scope="col">Lesson Count</th>
            <th scope="col">Select</th>
          </tr>
        </thead>
        <tbody>
          {units.map((unit) => (
            <tr key={unit._id}>
              <th scope="row">{unit.indice}</th>
              <td>{unit.name}</td>
              <td>{unit.lesson_count}</td>
              <td>
                <a href={`/select-unit/unit/${unit._id}`}>Lessons</a>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}
export default SelectCourse;
