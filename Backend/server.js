const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const { Pool } = require("pg");

const app = express();
const port = 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// PostgreSQL connection pool
const pool = new Pool({
  connectionString:
    "postgresql://neondb_owner:npg_4sGKRac7jDBY@ep-wandering-salad-adsv8ik7-pooler.c-2.us-east-1.aws.neon.tech/neondb?sslmode=require&channel_binding=require",
});

// Temporary in-memory storage (replace with DB later)
let employees = [];
let tasks = [];

// Admin Login (POST) - validate against DB
app.post("/admin/login", async (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) {
    return res.status(400).json({ success: false, message: "Username and password are required" });
  }
  try {
    const result = await pool.query(
      `SELECT id, username, email FROM admins WHERE username = $1 AND password = $2`,
      [username, password]
    );
    if (result.rows.length > 0) {
      const admin = result.rows[0];
      return res.json({ success: true, admin: { id: admin.id, username: admin.username, email: admin.email } });
    }
    // Temporary fallback if DB has no admin seeded
    if (username === "admin" && password === "admin123") {
      return res.json({ success: true, admin: { id: 0, username: "admin", email: "admin@example.com" } });
    }
    return res.status(401).json({ success: false, message: "Invalid username or password" });
  } catch (err) {
    console.error("Admin login error:", err);
    return res.status(500).json({ success: false, message: "Server error during login", error: err.message });
  }
});

// Employee Login
app.post("/api/employee/login", (req, res) => {
  const { empId, password } = req.body;
  const employee = employees.find(e => e.id === empId && e.password === password);
  if (employee) {
    return res.json({ success: true, employee });
  } else {
    return res.status(401).json({ success: false, message: "Invalid employee credentials" });
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


// Admin Stats
app.get("/stats", async (req, res) => {
  try {
    const result = await pool.query(
      "SELECT COUNT(*) as total, COUNT(CASE WHEN status = 'Pending' THEN 1 END) as pending FROM tasks"
    );
    const stats = {
      totalEmployees: employees.length,
      totalTasks: parseInt(result.rows[0].total || 0, 10),
      pendingTasks: parseInt(result.rows[0].pending || 0, 10)
    };
    res.json(stats);
  } catch (err) {
    console.error('Stats error:', err);
    res.status(500).json({ error: err.message });
  }
});

pool.connect()
  .then(() => console.log(" Connected to PostgreSQL"))
  .catch((err) => console.error("DB connection error", err));

// Routes
app.get("/", (req, res) => {
  res.send("Task API is running...");
});

// Get all tasks
app.get("/tasks", async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM tasks ORDER BY id ASC");
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Add new task
app.post("/tasks", async (req, res) => {
  const { date, time, project, module, submodule, details, status } = req.body;
  try {
    const result = await pool.query(
      "INSERT INTO tasks (date, time, project, module, submodule, details, status) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *",
      [date, time, project, module, submodule, details, status]
    );
    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Update task status
app.put("/tasks/:id", async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;
  try {
    const result = await pool.query(
      "UPDATE tasks SET status=$1 WHERE id=$2 RETURNING *",
      [status, id]
    );
    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Delete task
app.delete("/tasks/:id", async (req, res) => {
  const { id } = req.params;
  try {
    await pool.query("DELETE FROM tasks WHERE id=$1", [id]);
    res.json({ message: "Task deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

//app.listen(5000, () => console.log("Server running on http://localhost:5000"));
app.listen(port, () => {
  console.log(`🚀 Server running on http://localhost:${port}`);
});
