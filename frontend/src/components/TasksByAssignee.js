import React, { useState, useEffect } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.css';
import Layout from './Layout';

const TaskCard = ({ assignee }) => (
  <div className="card h-100 shadow">
    <div className="card-header bg-primary text-white">
      <h2 className="font-bold text-lg mb-1">Assigned By: {assignee.assignedBy}</h2>
      <p className="card-text">Assigned To: {assignee.assigned_to}</p>
    </div>
    <div className="card-body">
      <p className="card-text"><strong>Tasks:</strong> {assignee.tasks}</p>
      <p className="card-text"><strong>Descriptions:</strong> {assignee.descriptions}</p>
      <p className="card-text"><strong>Priorities:</strong> {assignee.priorities}</p>
      <p className="card-text"><strong>Statuses:</strong> {assignee.statuses}</p>
      <p className="card-text"><strong>Due Dates:</strong> {assignee.dueDates}</p>
      <p className="card-text"><strong>Execution Dates:</strong> {assignee.executionDates}</p>
    </div>
  </div>
);

const Tasks = () => {
  const [tasksByAssignee, setTasksByAssignee] = useState([]);

  useEffect(() => {
    const fetchTasksByAssignee = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/tasks/byassignee');
        setTasksByAssignee(response.data);
      } catch (error) {
        console.error('Error fetching tasks by assignee:', error);
      }
    };

    fetchTasksByAssignee();
  }, []);

  return (
    <Layout>
      <div className="container-fluid p-4">
        <div className="d-flex align-items-center mb-4">
          <h1 className="h4 mb-0">Tasks by Assignee</h1>
        </div>
        <p className="text-muted mb-4">Here are the tasks assigned to each assignee.</p>
        <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4">
          {tasksByAssignee.map(assignee => (
            <div className="col" key={assignee.assigneeId}>
              <TaskCard assignee={assignee} />
            </div>
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default Tasks;
