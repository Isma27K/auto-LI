import { Routes, Route } from "react-router-dom";
import "./App.css";

// ============== Page ==========================
import Login from "./routes/login/login";
import Dashboard from "./routes/dashboard/dashboard";

// ============ App ==============================
function App() {
  return (
    <>
      <div>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/dashboard" element={<Dashboard />} />
        </Routes>
      </div>
    </>
  );
}

export default App;
