import { Routes, Route } from "react-router-dom";
import "./App.css";

// ============== Page ==========================
import Login from "./routes/login/login";

function App() {
  return (
    <>
      <div>
        <Routes>
          <Route path="/" element={<Login />} />
        </Routes>
      </div>
    </>
  );
}

export default App;
