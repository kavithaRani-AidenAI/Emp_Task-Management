import AdminLogin from "./Pages/AdminLogin";
import AdminDashboard from "./Pages/AdminDashboard";
import EmployeeDashboard from "./Pages/EmployeeDashboard";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

function App() {
  return (
    <Router>
      <Routes>
        {/* Admin login page */}
        <Route path="/" element={<AdminLogin />} />

        {/* Admin dashboard page */}
        <Route path="/admin-dashboard" element={<AdminDashboard />} />

        {/* Employee dashboard page */}
        <Route path="/employee-dashboard" element={<EmployeeDashboard />} />
      </Routes>
    </Router>
  );
}

export default App;
