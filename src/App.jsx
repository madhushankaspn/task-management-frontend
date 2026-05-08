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

    // 1. අලුත් එකක් සේව් කිරීම (POST)
    const handleAddTask = () => {
        if(task.trim() === '') return;
        axios.post('http://localhost:8080/tasks', { taskName: task, completed: false })
            .then(() => {
                setTask('');
                fetchTasks();
            });
    };

    // 2. වැඩේ ඉවරයි කියලා Update කිරීම (PUT)
    const handleUpdateTask = (taskItem) => {
        axios.put(`http://localhost:8080/tasks/${taskItem.id}`, {
            taskName: taskItem.taskName,
            completed: !taskItem.completed
        }).then(() => fetchTasks());
    };

    // 3. මකා දැමීම (DELETE)
    const handleDeleteTask = (id) => {
        axios.delete(`http://localhost:8080/tasks/${id}`)
            .then(() => fetchTasks());
    };

    return (
        <div style={{ padding: '30px', fontFamily: 'Arial', maxWidth: '600px', margin: 'auto' }}>
            <h1 style={{ textAlign: 'center', color: '#333' }}>Task Manager App 🚀</h1>

            <div style={{ display: 'flex', gap: '10px', marginBottom: '20px' }}>
                <input
                    type="text"
                    placeholder="අලුත් වැඩක් ටයිප් කරන්න..."
                    value={task}
                    onChange={(e) => setTask(e.target.value)}
                    style={{ padding: '10px', flex: '1', borderRadius: '5px', border: '1px solid #ccc' }}
                />
                <button onClick={handleAddTask} style={{ padding: '10px 20px', cursor: 'pointer', backgroundColor: '#007BFF', color: 'white', border: 'none', borderRadius: '5px' }}>
                    Add
                </button>
            </div>

            <h3>මගේ වැඩ ලිස්ට් එක:</h3>
            <ul style={{ listStyleType: 'none', padding: 0 }}>
                {tasksList.map((t) => (
                    <li key={t.id} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '10px', backgroundColor: '#f4f4f4', marginBottom: '8px', borderRadius: '4px', borderLeft: t.completed ? '5px solid gray' : '5px solid #28a745' }}>

                        {/* වැඩේ ඉවර නම් අකුරු මැදින් ඉරක් අඳිනවා */}
                        <span style={{ textDecoration: t.completed ? 'line-through' : 'none', flex: 1, color: t.completed ? 'gray' : 'black' }}>
              {t.taskName}
            </span>

                        <div style={{ display: 'flex', gap: '5px' }}>
                            <button onClick={() => handleUpdateTask(t)} style={{ padding: '5px 10px', cursor: 'pointer', backgroundColor: t.completed ? 'gray' : '#ffc107', color: 'black', border: 'none', borderRadius: '3px' }}>
                                {t.completed ? 'Undo' : 'Done'}
                            </button>

                            <button onClick={() => handleDeleteTask(t.id)} style={{ padding: '5px 10px', cursor: 'pointer', backgroundColor: '#dc3545', color: 'white', border: 'none', borderRadius: '3px' }}>
                                Delete
                            </button>
                        </div>

                    </li>
                ))}
            </ul>
        </div>
    );
}

export default App;