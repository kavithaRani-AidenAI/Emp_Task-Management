import express from "express";
import cors from "cors";

const app = express();
app.use(cors());
app.use(express.json());

// Temporary in-memory storage (replace with DB later)
let employees = [];
let tasks = [];

// Admin credentials (can be in DB)
//const admin = { username: "admin", password: "admin123" };

// Admin Login
app.get("/api/admin/login", (req, res) => {
  const { username, password } = req.body;
  if (username === admin.username && password === admin.password) {
    res.json({ success: true, role: "admin" });
  } else {
    res.status(401).json({ success: false, message: "Invalid admin credentials" });
  }
});

// Employee Login
app.post("/api/employee/login", (req, res) => {
  const { empId, password } = req.body;
  const employee = employees.find(e => e.id === empId && e.password === password);
  if (employee) {
    res.json({ success: true, employee });
  } else {
    res.status(401).json({ success: false, message: "Invalid employee credentials" });
  }
});

// Add Employee
app.post("/api/employees", (req, res) => {
  const { name, email, department, position } = req.body;
  if (!name || !email || !department || !position) {
    return res.status(400).json({ success: false, message: "All fields required" });
  }
  const newEmployee = {
    id: "EMP" + String(employees.length + 1).padStart(3, "0"),
    name, email, department, position,
    password: "emp123"
  };
  employees.push(newEmployee);
  res.json({ success: true, employee: newEmployee });
});

// Get Employees
app.get("/api/employees", (req, res) => {
  res.json(employees);
});

// Assign Task
app.post("/api/tasks", (req, res) => {
  const { employeeId, title, description, priority, dueDate } = req.body;
  if (!employeeId || !title || !description || !dueDate) {
    return res.status(400).json({ success: false, message: "All fields required" });
  }
  const newTask = {
    id: tasks.length + 1,
    employeeId, title, description, priority, dueDate,
    status: "pending"
  };
  tasks.push(newTask);
  res.json({ success: true, task: newTask });
});

// Get All Tasks
app.get("/api/tasks", (req, res) => {
  res.json(tasks);
});

// Update Task Status
app.put("/api/tasks/:id", (req, res) => {
  const { id } = req.params;
  const { status } = req.body;
  const task = tasks.find(t => t.id == id);
  if (!task) return res.status(404).json({ success: false, message: "Task not found" });
  task.status = status;
  res.json({ success: true, task });
});

// Delete Task
app.delete("/api/tasks/:id", (req, res) => {
  const { id } = req.params;
  tasks = tasks.filter(t => t.id != id);
  res.json({ success: true, message: "Task deleted" });
});

app.listen(5000, () => console.log("Server running on http://localhost:5000"));
