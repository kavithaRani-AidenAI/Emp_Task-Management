import AdminLogin from "./Pages/AdminLogin";
import EmployeeLogin from "./Pages/EmployeeLogin";
import EmployeeDashboard from "./Pages/EmployeeDashboard";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";


function App() {
  return (
    <Router>
      <Routes>
        {/* Admin login page */}
        <Route path="/" element={<AdminLogin />} />

        {/* Employee dashboard page */}
        
        <Route path="/employee-login" element={<EmployeeLogin />} />
        <Route path="/employee/dashboard" element={<EmployeeDashboard />} />
      </Routes>
    </Router>
  );
}

export default App;
