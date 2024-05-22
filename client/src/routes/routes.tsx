import { BrowserRouter, Routes, Route } from "react-router-dom";
import ProtectedRoutes from "./ProtectRoutes/RoutesProtect";
import Home from "../component/Home";
import Login from "../component/authorization/Login";

function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route element={<ProtectedRoutes />}>
          <Route path="/" element={<Home />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default AppRouter;
