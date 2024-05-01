import React, { useState, useEffect } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.css';
import Layout from './Layout';

const buttonClasses = 'btn btn-primary';
const headerClasses = 'd-flex justify-content-between align-items-center mb-4';
const cardClasses = 'card shadow bg-light';
const cardBodyClasses = 'card-body';

const FilterByDueDate = () => {
    const [tasks, setTasks] = useState([]);

    useEffect(() => {
        fetchTasksByDueDate();
    }, []);

    const fetchTasksByDueDate = async () => {
        try {
            const response = await axios.get('http://localhost:5000/api/tasks/byduedates');
            setTasks(response.data);
        } catch (error) {
            console.error('Failed to fetch tasks by due dates:', error);
        }
    };

    return (
        <Layout>
            <div className="container mt-4">
                <div className="row justify-content-center">
                    <div className="col-lg-8">
                        <div className={cardClasses}>
                            <div className={cardBodyClasses}>
                                <header className={headerClasses}>
                                    <h1 className="h4 mb-0">Filtered Tasks by Due Date</h1>
                                </header>
                                <div className="table-responsive">
                                    <table className="table table-striped">
                                        <thead>
                                            <tr>
                                                <th>Due Date</th>
                                                <th>Title</th>
                                                <th>Name</th>
                                                <th>Description</th>
                                                <th>Progress</th>
                                                <th>Execution Date</th>
                                                <th>Priority</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {tasks.map(task => (
                                                <tr key={task.task_id}>
                                                    <td>{new Date(task.due_date).toLocaleDateString()}</td>
                                                    <td>{task.title}</td>
                                                    <td>{task.userName}</td>
                                                    <td>{task.description}</td>
                                                    <td>{task.status}</td>
                                                    <td>{task.execution_date}</td>
                                                    <td>{task.priority}</td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    );
};

export default FilterByDueDate;
