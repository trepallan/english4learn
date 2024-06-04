import { useState, useEffect } from "react";
import api from "../../authentication/api";
import { useParams } from "react-router-dom";
import "../../css/SelectCourse.css";
import React from "react";
import Table from "./Table";
import classeOrder, { classe } from "./ClassOrder";

interface Course {
  _id: number;
  name: string;
  index: number;
  unit_count: number;
}

function handlepathClick(path: any) {
  const c = classeOrder.find((c) => c.name === path.type) as classe;
  return (window.location.href = c.aTagLink + path.id);
}

export default function SelectCourse(props: any) {
  const classeType = props.classeType;
  let classId = useParams().id;
  if (!classId) classId = "";
  const [path, setPath] = useState<any[]>([]);
  const [courses, setCourses] = useState<Course[]>([]);
  const [message, setMessage] = useState("");

  let classe = classeOrder.find((c) => c.name === classeType);

  useEffect(() => {
    (async () => {
      if (!classe) {
        setMessage("Classe not found");
        return;
      }
      const response = await api.get(classe.apiPath + classId);
      if (response.status !== 200) {
        setMessage(response.message);
        return;
      }
      setCourses(response.data);

      const main = { name: "Courses", id: "", type: "Main" }; // The main path is always the first
      setPath([main, ...response.path]);
    })();
  }, [classId, classe]);

  if (!classe) {
    return <h1>Classe not found</h1>;
  } else {
    return (
      <>
        <p className="selectCoursePath">
          {path &&
            path.map((p: any, index: number) => (
              <React.Fragment key={p.id}>
                {index > 0 && " / "}
                <span onClick={() => handlepathClick(p)}>{p.name}</span>
              </React.Fragment>
            ))}
        </p>
        <h1>Select {classe.name}</h1>
        {message && <h1>{message}</h1>}

        <Table
          data={courses}
          aTagLink={classe.aTagLink}
          children={classe.children}
        />
      </>
    );
  }
}
