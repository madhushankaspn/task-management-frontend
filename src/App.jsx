import { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

function App() {
    const [task, setTask] = useState('');
    const [tasksList, setTasksList] = useState([]);

    useEffect(() => {
        fetchTasks();
    }, []);

    const fetchTasks = () => {
        axios.get('http://localhost:8080/tasks')
            .then((response) => setTasksList(response.data))
            .catch((error) => console.error("Error:", error));
    };

    const handleAddTask = () => {
        if(task.trim() === '') return;
        axios.post('http://localhost:8080/tasks', { taskName: task, completed: false })
            .then(() => {
                setTask('');
                fetchTasks();
            });
    };

    const handleUpdateTask = (taskItem) => {
        axios.put(`http://localhost:8080/tasks/${taskItem.id}`, {
            taskName: taskItem.taskName,
            completed: !taskItem.completed
        }).then(() => fetchTasks());
    };

    const handleDeleteTask = (id) => {
        axios.delete(`http://localhost:8080/tasks/${id}`)
            .then(() => fetchTasks());
    };

    const completedCount = tasksList.filter(t => t.completed).length;

    return (
        <div className="app-container">
            <h1 className="title">Task Master ✨</h1>

            <div className="stats">
                <b>{completedCount}</b> of <b>{tasksList.length}</b> tasks completed!
            </div>

            <div className="input-group">
                <input
                    type="text"
                    className="task-input"
                    placeholder="Add a new task..."
                    value={task}
                    onChange={(e) => setTask(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && handleAddTask()}
                />
                <button className="add-btn" onClick={handleAddTask}>Add</button>
            </div>

            <ul className="task-list">
                {tasksList.length === 0 ? (
                    <div className="empty-state">No tasks yet! 🎉</div>
                ) : (
                    tasksList.map((t) => (
                        <li key={t.id} className={`task-item ${t.completed ? 'completed' : ''}`}>

                            <span className="task-text">{t.taskName}</span>

                            <div className="action-btns">
                                <button
                                    className={`icon-btn ${t.completed ? 'undo-btn' : 'done-btn'}`}
                                    onClick={() => handleUpdateTask(t)}
                                    title={t.completed ? "Undo" : "Mark as Done"}
                                >
                                    {t.completed ? '🔄' : '✅'}
                                </button>

                                <button
                                    className="icon-btn delete-btn"
                                    onClick={() => handleDeleteTask(t.id)}
                                    title="Delete"
                                >
                                    🗑️
                                </button>
                            </div>
                        </li>
                    ))
                )}
            </ul>
        </div>
    );
}

export default App;