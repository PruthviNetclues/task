import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap CSS before your custom CSS
import Layout from './Layout';

const AddTask = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    status: "In Progress",
    priority: "High",
    assigned_to: "",
    due_date: "",
    execution_date: ""
  });
  const [error, setError] = useState("");
  const [token, setToken] = useState(""); // Initialize token state

  useEffect(() => {
    // Retrieve token from local storage
    const storedToken = localStorage.getItem('accessToken');
    if (storedToken) {
      setToken(storedToken);
    }
  }, []);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault(); // Prevent default form submission behavior

    // Perform frontend validation
    if (!formData.title || !formData.description || !formData.assigned_to || !formData.due_date || !formData.execution_date) {
      setError("All fields are required");
      return;
    }

    setError("");
    if (!token) {
      console.error('Token is undefined');
      return;
    }

    // API request to the backend
    try {
      const response = await fetch('http://localhost:5000/api/tasks/add', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(formData),
      });

      const result = await response.json();
      if (response.ok) {
        console.log('Task added successfully:', result);
        // Further actions on success (e.g., redirect or clear form)
        toast.success('Task added successfully');
        // Redirect to all tasks page after a short delay
        setTimeout(() => {
          navigate('/alltasks');
        }, 2000);
      } else {
        throw new Error(result.message); // Throw an error to be caught by the catch block
      }
    } catch (error) {
      console.error('Error adding task:', error.message);
      // Handle errors here, such as displaying a user notification
    }
  };

  return (
    <Layout>
      <div className="container mt-5 mb-5">
        <h2 className="text-center mb-4">Create New Task</h2>
        <div className="row justify-content-center">
          <div className="col-md-6">
            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label className="form-label">Title</label>
                <input
                  type="text"
                  className="form-control"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  placeholder="Enter task title"
                />
              </div>
              <div className="mb-3">
                <label className="form-label">Description</label>
                <textarea
                  className="form-control"
                  name="description"
                  rows="3"
                  value={formData.description}
                  onChange={handleChange}
                  placeholder="Enter task description"
                ></textarea>
              </div>
              <div className="row mb-3">
                <div className="col">
                  <label className="form-label">Status</label>
                  <select
                    className="form-select"
                    name="status"
                    value={formData.status}
                    onChange={handleChange}
                  >
                    <option value="In Progress">In Progress</option>
                    <option value="Pending">Pending</option>
                    <option value="Completed">Completed</option>
                  </select>
                </div>
                <div className="col">
                  <label className="form-label">Priority</label>
                  <select
                    className="form-select"
                    name="priority"
                    value={formData.priority}
                    onChange={handleChange}
                  >
                    <option value="High">High</option>
                    <option value="Medium">Medium</option>
                    <option value="Low">Low</option>
                  </select>
                </div>
              </div>
              <div className="mb-3">
                <label className="form-label">Assigned To</label>
                <input
                  type="text"
                  className="form-control"
                  name="assigned_to"
                  value={formData.assigned_to}
                  onChange={handleChange}
                  placeholder="Enter assignee name"
                />
              </div>
              <div className="row mb-3">
                <div className="col">
                  <label className="form-label">Due Date</label>
                  <input
                    type="date"
                    className="form-control"
                    name="due_date"
                    value={formData.due_date}
                    onChange={handleChange}
                  />
                </div>
                <div className="col">
                  <label className="form-label">Execution Date</label>
                  <input
                    type="date"
                    className="form-control"
                    name="execution_date"
                    value={formData.execution_date}
                    onChange={handleChange}
                  />
                </div>
              </div>
              {error && <p className="text-danger">{error}</p>}
              <button type="submit" className="btn btn-primary">
                Save Task
              </button>
            </form>
          </div>
        </div>
      </div>
      <ToastContainer position="bottom-right" />
    </Layout>
  );
};

export default AddTask;
