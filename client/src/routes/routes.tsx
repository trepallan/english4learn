import { BrowserRouter, Routes, Route } from "react-router-dom";
import ProtectedRoutes from "./ProtectRoutes/RoutesProtect";
import Home from "../component/Home";
import Auth from "../component/authorization/Auth";

function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/register" element={<Auth />} />
        <Route path="/login" element={<Auth />} />
        <Route element={<ProtectedRoutes />}>
          <Route path="/" element={<Home />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default AppRouter;
