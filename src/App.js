import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AdminLogin from "./Pages/AdminLogin";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<AdminLogin />} />
      </Routes>
    </Router>
  );
}

export default App;

