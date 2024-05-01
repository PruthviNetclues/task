import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Layout from './Layout';

const buttonClasses = 'btn btn-primary';
const cardClasses = 'card shadow mb-4';
const cardHeaderClasses = 'card-header bg-primary text-white';
const cardBodyClasses = 'card-body';
const taskItemClasses = 'list-group-item d-flex justify-content-between align-items-center';

const TaskCard = ({ title, count, children }) => {
  return (
    <div className={cardClasses}>
      <div className={cardHeaderClasses}>
        <h3 className="m-0">{title} ({count})</h3>
      </div>
      <div className={cardBodyClasses}>
        <ul className="list-group list-group-flush">
          {children}
        </ul>
      </div>
    </div>
  );
};

const TaskItem = ({ icon, title, description, assignee, status_name, date }) => {
  return (
    <li className={taskItemClasses}>
      <div className="d-flex flex-column">
        <h4 className="mb-1">{title}</h4>
        <p className="mb-1">{description}</p>
        <p className="mb-1">Assignee: {assignee}</p>
        <p className="mb-1">Status: {status_name}</p>
        <p className="mb-0">Due Date: {new Date(date).toLocaleDateString()}</p>
      </div>
      <span className="badge bg-secondary rounded-pill">{icon}</span>
    </li>
  );
};

const Priority = () => {
  const [tasksData, setTasksData] = useState([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await axios.get('http://localhost:5000/api/tasks/bypriority');
        const data = response.data;
        const taskGroups = data.reduce((acc, task) => {
          const { priority } = task;
          if (!acc[priority]) {
            acc[priority] = [];
          }
          acc[priority].push(task);
          return acc;
        }, {});

        const formattedTasks = Object.entries(taskGroups).map(([priority, tasks]) => ({
          priority,
          tasks
        }));

        setTasksData(formattedTasks);
      } catch (error) {
        console.error('Error fetching tasks:', error);
      }
    }

    fetchData();
  }, []);

  return (
    <Layout>
      <div className="container py-4">
        <h1 className="mb-4">Priority Tasks</h1>
        <div className="row row-cols-1 row-cols-md-3 g-4">
          {tasksData.map((column, index) => (
            <div key={index} className="col">
              <TaskCard title={column.priority} count={column.tasks.length}>
                {column.tasks.map(task => (
                  <TaskItem
                    key={task.task_id}
                    icon="📋"
                    title={task.title}
                    description={task.description}
                    assignee={task.userName} // Note: `userNmae` should be corrected to `userName` if possible in the API
                    status_name={task.status}
                    date={task.due_date}
                  />
                ))}
              </TaskCard>
            </div>
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default Priority;
