<<<<<<< HEAD
// src/pages/AdminDashboard.jsx
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import API from '../API';
import './AdminDashboard.css';
=======
import "../App.css";
import "./EmployeeDashboard.css";
import React, { useEffect, useState } from "react";
import API from "../API"; // assuming you have an axios instance
import Header from "./Header";
>>>>>>> 73d331d0be1b894eee85872e89902ab0658c9f77

function EmployeeDashboard() {
  const [employee, setEmployee] = useState(null);
  const [tasks, setTasks] = useState([]);
  const [completedDates, setCompletedDates] = useState([]);
  const [task, setTask] = useState("");
  const [project, setProject] = useState("");
  const [module, setModule] = useState("");
  const [submodule, setSubmodule] = useState("");

  const [currentTime, setCurrentTime] = useState(new Date());

  const [showPopup, setShowPopup] = useState(false);
  const [taskToDelete, setTaskToDelete] = useState(null);
  const [confirmDelete, setConfirmDelete] = useState(false);

  const [showSuccessPopup, setShowSuccessPopup] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [successColor, setSuccessColor] = useState("green");

  const projects = ["APCMMS", "Project 2", "Project 3"];
  const modules = ["Module 1", "Module 2", "Module 3"];
  const submodules = ["Submodule A", "Submodule B", "Submodule C"];

  const holidays = [
    new Date(currentTime.getFullYear(), currentTime.getMonth(), 5).toLocaleDateString(),
    new Date(currentTime.getFullYear(), currentTime.getMonth(), 15).toLocaleDateString(),
    new Date(currentTime.getFullYear(), currentTime.getMonth(), 25).toLocaleDateString(),
  ];

  // Update live time
  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  // Fetch employee profile + tasks on mount
  useEffect(() => {
    const fetchEmployee = async () => {
      const token = localStorage.getItem("token");
      if (!token) return;

<<<<<<< HEAD
  function logout(){
    localStorage.removeItem('admin');
    nav('/');
  }

  return (
    <div className="admin-bg">
      <div className="admin-card">
        <div className="admin-actions">
          <button className="pill btn-primary" onClick={()=>nav('/admin/employees')}>Manage Employees</button>
          <button className="pill btn-accent" onClick={()=>nav('/admin/tasks')}>Assign Tasks</button>
          <button className="pill btn-danger" onClick={logout}>Logout</button>
        </div>

        <div className="admin-hero">
          <h2>Welcome, Admin!</h2>
          <p>Manage your employees and assign tasks efficiently</p>
        </div>

        <div className="stats-grid">
          <div className="stat-card">
            <div className="stat-number">{stats.totalEmployees}</div>
            <div className="stat-label">Total Employees</div>
          </div>
          <div className="stat-card">
            <div className="stat-number">{stats.totalTasks}</div>
            <div className="stat-label">Total Tasks</div>
          </div>
          <div className="stat-card">
            <div className="stat-number">{stats.pendingTasks}</div>
            <div className="stat-label">Pending Tasks</div>
          </div>
        </div>
=======
      try {
        const res = await API.get("/api/employee/me", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setEmployee(res.data);
        setTasks(res.data.tasks || []);

        const dates = (res.data.tasks || []).map((t) => t.date);
        setCompletedDates([...new Set(dates)]);
      } catch (err) {
        console.error(err);
      }
    };
    fetchEmployee();
  }, []);

  const dateString = currentTime.toLocaleDateString();
  const timeString = currentTime.toLocaleTimeString();

  // Submit task for logged-in employee
  const handleSubmit = async () => {
    if (!task) return;

    const newTask = {
      date: dateString,
      time: timeString,
      project: project || "--",
      module: module || "--",
      submodule: submodule || "--",
      details: task,
      status: "Pending",
    };

    try {
      const token = localStorage.getItem("token");
      const res = await API.post("/api/tasks", newTask, {
        headers: { Authorization: `Bearer ${token}` },
      });

      setTasks((prev) => [...prev, res.data]);
      setTask("");

      if (!completedDates.includes(dateString)) {
        setCompletedDates([...completedDates, dateString]);
      }

      setSuccessMessage("Task submitted successfully!");
      setSuccessColor("green");
      setShowSuccessPopup(true);
      setTimeout(() => setShowSuccessPopup(false), 2000);
    } catch (err) {
      console.error(err);
      alert("Error saving task: " + err.message);
    }
  };

  // Toggle task status
  const toggleStatus = async (taskItem) => {
    try {
      const token = localStorage.getItem("token");
      const newStatus = taskItem.status === "Pending" ? "Done" : "Pending";
      const res = await API.put(`/api/tasks/${taskItem.id}`, { status: newStatus }, {
        headers: { Authorization: `Bearer ${token}` },
      });

      setTasks((prev) => prev.map((t) => (t.id === res.data.id ? res.data : t)));

      // update completedDates
      if (newStatus === "Done" && !completedDates.includes(taskItem.date)) {
        setCompletedDates([...completedDates, taskItem.date]);
      } else if (newStatus === "Pending" && completedDates.includes(taskItem.date)) {
        setCompletedDates(completedDates.filter((d) => d !== taskItem.date));
      }
    } catch (err) {
      console.error(err);
    }
  };

  // Delete task
  const deleteTask = async (id) => {
    try {
      const token = localStorage.getItem("token");
      const taskToDelete = tasks.find((t) => t.id === id);
      await API.delete(`/api/tasks/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setTasks((prev) => prev.filter((t) => t.id !== id));

      const remainingTasksOnDate = tasks.filter(
        (t) => t.date === taskToDelete.date && t.id !== id && t.status === "Done"
      );
      if (remainingTasksOnDate.length === 0) {
        setCompletedDates(completedDates.filter((d) => d !== taskToDelete.date));
      }

      setSuccessMessage("Task deleted successfully!");
      setSuccessColor("red");
      setShowSuccessPopup(true);
      setTimeout(() => setShowSuccessPopup(false), 2000);
    } catch (err) {
      console.error(err);
    }
  };

  if (!employee) return <div>Loading employee data...</div>;

  return (
    <div className="container">
      <Header currentUser={employee} />

      {/* Profile + Calendar */}
      <div className="main-row">
        <div className="left-col">
          <div className="card profile-row">
            <img src="/tim.jpeg" alt="Profile" className="profile-photo" />
            <div className="profile-info">
              <p><strong>Name:</strong> {employee.name}</p>
              <p><strong>Email:</strong> {employee.email}</p>
              <p><strong>Designation:</strong> {employee.designation || "Developer"}</p>
              <p><strong>Project:</strong> {employee.project || "--"}</p>
            </div>
          </div>

          <div className="date-time-row">
            <div className="date-box card">
              <p><strong>Date:</strong> {dateString}</p>
            </div>
            <div className="time-box card">
              <p><strong>Time:</strong> {timeString}</p>
            </div>
          </div>
        </div>

        <div className="right-col">
          {/* Calendar */}
          <div className="card calendar-box small-calendar">
            <p className="calendar-title">Calendar</p>
            <div className="calendar-grid">
              {[...Array(30).keys()].map((d) => {
                const dayNumber = d + 1;
                const dateOfDay = new Date(
                  currentTime.getFullYear(),
                  currentTime.getMonth(),
                  dayNumber
                );
                const dateStr = dateOfDay.toLocaleDateString();

                const isToday = dayNumber === currentTime.getDate();
                const isCompleted = completedDates.includes(dateStr);
                const isHoliday = holidays.includes(dateStr);
                const isFuture = dateOfDay > currentTime;

                let className = "calendar-day";
                if (isFuture) className += " future";
                else if (isCompleted) className += " completed";
                else if (isHoliday) className += " holiday";
                else className += " pending";

                if (isToday) className += " today";

                return <div key={d} className={className}>{dayNumber}</div>;
              })}
            </div>
          </div>
        </div>
      </div>

      {/* Dropdowns */}
      <div className="dropdowns">
        <select value={project} onChange={(e) => setProject(e.target.value)}>
          <option value="">--Select Project--</option>
          {projects.map((p) => <option key={p} value={p}>{p}</option>)}
        </select>

        <select value={module} onChange={(e) => setModule(e.target.value)}>
          <option value="">--Select Module--</option>
          {modules.map((m) => <option key={m} value={m}>{m}</option>)}
        </select>

        <select value={submodule} onChange={(e) => setSubmodule(e.target.value)}>
          <option value="">--Select Submodule--</option>
          {submodules.map((s) => <option key={s} value={s}>{s}</option>)}
        </select>
>>>>>>> 73d331d0be1b894eee85872e89902ab0658c9f77
      </div>

      {/* Task Input */}
      <div className="task-box">
        <input
          type="text"
          placeholder="Enter Task Details"
          value={task}
          onChange={(e) => setTask(e.target.value)}
        />
        <button onClick={handleSubmit}>Submit</button>
      </div>

      {/* Task Table */}
      <div className="table-box">
        <table>
          <thead>
            <tr>
              <th>S.No</th>
              <th>Date</th>
              <th>Time</th>
              <th>Project</th>
              <th>Module</th>
              <th>Submodule</th>
              <th>Activity Details</th>
              <th>Status / Actions</th>
            </tr>
          </thead>
          <tbody>
            {tasks.length === 0 ? (
              <tr>
                <td colSpan="8">No tasks submitted yet</td>
              </tr>
            ) : (
              tasks.map((t, i) => (
                <tr key={t.id}>
                  <td>{i + 1}</td>
                  <td>{t.date}</td>
                  <td>{t.time}</td>
                  <td>{t.project}</td>
                  <td>{t.module}</td>
                  <td>{t.submodule}</td>
                  <td>{t.details}</td>
                  <td>
                    {t.status}
                    <div style={{ marginTop: "6px" }}>
                      <button onClick={() => toggleStatus(t)}>Change Status</button>
                      <button
                        onClick={() => {
                          setTaskToDelete(t);
                          setShowPopup(true);
                        }}
                        style={{ marginLeft: "6px" }}
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Delete Confirmation Popup */}
      {showPopup && (
        <div className="modal-overlay">
          <div className="modal-content">
            <span className="modal-close" onClick={() => setShowPopup(false)}>❌</span>
            <h3 style={{ color: "red" }}>You want to delete this task?</h3>
            <p><strong>{taskToDelete?.details}</strong></p>

            <label>
              <input
                type="checkbox"
                checked={confirmDelete}
                onChange={(e) => setConfirmDelete(e.target.checked)}
              />
              Yes, I want to delete
            </label>

            <div className="modal-actions">
              <button
                className="delete-btn"
                disabled={!confirmDelete}
                onClick={() => {
                  deleteTask(taskToDelete.id);
                  setShowPopup(false);
                  setConfirmDelete(false);
                }}
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Success Popup */}
      {showSuccessPopup && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h3 style={{ color: successColor }}>{successMessage}</h3>
          </div>
        </div>
      )}
    </div>
  );
}

export default EmployeeDashboard;