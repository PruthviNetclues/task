import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import FilterByDueDate from './FilterByDueDate';
import { useNavigate } from 'react-router-dom';
import Layout from './Layout';

const buttonClasses = 'btn btn-primary';
const headerClasses = 'd-flex justify-content-between align-items-center';
const tableClasses = 'table table-striped table-hover';
const tableHeaderClasses = 'bg-primary text-white';

const Alltask = () => {
    const [tasks, setTasks] = useState([]);
    const [showFilter, setShowFilter] = useState(false);

    const navigate = useNavigate();

    useEffect(() => {
        const fetchTasks = async () => {
            try {
                const response = await fetch('http://localhost:5000/api/tasks'); // URL needs to be the endpoint where your tasks are fetched
                const data = await response.json();
                setTasks(data);
            } catch (error) {
                console.error('Failed to fetch tasks:', error);
            }
        };

        fetchTasks();
    }, []);

    const handleFilterClick = () => {
        setShowFilter(!showFilter);
        navigate('/filterbyduedate');
    };

    const updateTasks = (filteredTasks) => {
        setTasks(filteredTasks);
    };

    return (
        <Layout>
            <div className="container py-5">
                <div className="card">
                    <div className="card-header bg-primary text-white">
                        <div className={headerClasses}>
                            <h2 className="card-title mb-0">All Tasks</h2>
                            <button className="btn btn-success" onClick={() => navigate('/newtask')}>Add New Task</button>
                        </div>
                    </div>
                    <div className="card-body">
                        <div className="mb-3 d-flex justify-content-between">
                            <div className="d-flex gap-3">
                                <button className={buttonClasses}>All Tasks</button>
                                <button className={buttonClasses}>Properties</button>
                                <button className={buttonClasses} onClick={handleFilterClick}>Filter</button>
                                <button className={buttonClasses}>Sort</button>
                                <button className={buttonClasses}>Search</button>
                            </div>
                            <div>
                                <button className="btn btn-outline-secondary">...</button>
                            </div>
                        </div>
                        <div className="table-responsive">
                            <table className={tableClasses}>
                                <thead className={tableHeaderClasses}>
                                    <tr>
                                        <th>Priority</th>
                                        <th>Status</th>
                                        <th>Name</th>
                                        <th>Assignee</th>
                                        <th>Due Date</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {tasks.map((task, index) => (
                                        <tr key={index}>
                                            <td>{task.priority}</td>
                                            <td>{task.status}</td>
                                            <td>{task.title}</td>
                                            <td>{task.userNmae}</td>
                                            <td>{new Date(task.due_date).toLocaleDateString()}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
                {showFilter && <FilterByDueDate tasks={tasks} updateTasks={updateTasks} />}
            </div>
        </Layout>
    );
};

export default Alltask;
