import AdminLogin from "./Pages/AdminLogin";
<<<<<<< HEAD
import AdminDashboard from "./Pages/AdminDashboard";
=======
import EmployeeLogin from "./Pages/EmployeeLogin";
>>>>>>> 73d331d0be1b894eee85872e89902ab0658c9f77
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
        
        <Route path="/employee-login" element={<EmployeeLogin />} />
        <Route path="/employee/dashboard" element={<EmployeeDashboard />} />
      </Routes>
    </Router>
  );
}

export default App;
