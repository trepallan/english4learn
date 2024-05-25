import { Route, Routes } from "react-router-dom";
import SelectCourse from "./SelectCourse";

function SelectCourseRoute() {
  return (
    <Routes>
      <Route path="/" element={<SelectCourse classeType="Course" />} />
      <Route path="/unit/:id" element={<SelectCourse classeType="Unit" />} />
      <Route
        path="/lesson/:id"
        element={<SelectCourse classeType="Lesson" />}
      />
      <Route path="/theme/:id" element={<SelectCourse classeType="Theme" />} />
    </Routes>
  );
}

export default SelectCourseRoute;
