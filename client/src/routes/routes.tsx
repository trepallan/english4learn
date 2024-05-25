import { BrowserRouter, Routes, Route } from "react-router-dom";
import ProtectedRoutes from "./ProtectRoutes/RoutesProtect";
import Home from "../component/Home";
import Auth from "../component/authorization/Auth";
import NavBar from "../component/navBar/NavBar";
import SelectCourseRoute from "../component/selectCourse/Routes";

function AppRouter() {
  return (
    <>
      <BrowserRouter>
        <NavBar />
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<Home />} />
          <Route path="/select-course/*" element={<SelectCourseRoute />} />
          <Route path="/register" element={<Auth />} />
          <Route path="/login" element={<Auth />} />

          {/* Protected Routes */}
          <Route element={<ProtectedRoutes />}></Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default AppRouter;
