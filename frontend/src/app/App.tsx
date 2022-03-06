import { BrowserRouter, Outlet, Route, Routes } from "react-router-dom";

// Auth
import UsuarioProvider from "../auth/UsuarioProvider";

// Layouts
import DashboardLayout from "../layouts/DashboardLayout";
import UsuarioLayout from "../layouts/UsuarioLayout";
import Dashboard from "../pages/Dashboard";

// Pages
import Home from "../pages/Home";
import Login from "../pages/Login";
import NotFound from "../pages/NotFound";
import Register from "../pages/Register";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<User />}>
          <Route path="/" element={<Home />} />
        </Route>
        <Route path="/Iniciar" element={<Login />} />
        <Route path="/Registrarse" element={<Register />} />
        <Route element={<NotFound />} />
        <Route path="Dashboard" element={<Dash />}>
          <Route path="/Dashboard" element={<Dashboard />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
const Dash = () => {
  return (
    <DashboardLayout>
      <Outlet />
    </DashboardLayout>
  );
};
const User = () => {
  return (
    <UsuarioLayout>
      <Outlet />
    </UsuarioLayout>
  );
};
const prev = () => (
  <UsuarioProvider>
    <App></App>
  </UsuarioProvider>
);
export default prev;
