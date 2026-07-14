import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";

import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import ApiManagement from "./pages/ApiManagement";
import Incidents from "./pages/Incidents";
import Settings from "./pages/Settings";

function App() {
  return (
    <BrowserRouter>

      <Routes>

        <Route
          path="/"
          element={<Login />}
        />

        <Route
          path="/login"
          element={<Login />}
        />

        <Route
          path="/register"
          element={<Register />}
        />

        <Route
          path="/dashboard"
          element={<Dashboard />}
        />

        <Route
          path="/apis"
          element={<ApiManagement />}
        />

        <Route
          path="/incidents"
          element={<Incidents />}
        />

        <Route
        path="/settings"
        element={<Settings />}
        />

      </Routes>

    </BrowserRouter>
  );
}

export default App;