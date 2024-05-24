import { BrowserRouter, Routes, Route } from "react-router-dom";
import ProtectedRoutes from "./ProtectRoutes/RoutesProtect";
import Home from "../component/Home";
import Auth from "../component/authorization/Auth";
import NavBar from "../component/navBar/NavBar";
import SelectUnit from "../component/sleceUtil/SelectUnit";
import Selectlesson from "../component/sleceUtil/Selectlesson";

function AppRouter() {
  return (
    <>
      <NavBar />
      <BrowserRouter>
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<Home />} />
          <Route path="/select-course" element={<SelectUnit />} />
          <Route path="/select-course/unit/:id" element={<Selectlesson />} />
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
