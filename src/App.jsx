import { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

function App() {
    // 1. මතකය: ටයිප් කරන අලුත් වැඩේ
    const [task, setTask] = useState('');

    // මතකය: Database එකෙන් ගේන වැඩ ලිස්ට් එක (Array එකක්)
    const [tasksList, setTasksList] = useState([]);

    // 2. පිටුව Load වෙනකොටම වැඩ ලිස්ට් එක ගේනවා (GET)
    useEffect(() => {
        fetchTasks();
    }, []);

    // වේටර්ට කතා කරලා දත්ත ටික ගේන ෆන්ක්ෂන් එක
    const fetchTasks = () => {
        axios.get('http://localhost:8080/tasks')
            .then((response) => {
                setTasksList(response.data); // ගෙනාපු දත්ත ටික මතකයට දාගන්නවා
            })
            .catch((error) => console.error("දත්ත ගේද්දී දෝෂයක්:", error));
    };

    // 3. අලුත් එකක් සේව් කිරීම (POST)
    const handleAddTask = () => {
        if(task.trim() === '') return; // හිස්ව යවන එක නවත්තන්න

        axios.post('http://localhost:8080/tasks', {
            taskName: task,
            completed: false
        })
            .then(() => {
                setTask(''); // කොටුව ආයේ හිස් කරනවා
                fetchTasks(); // අලුත් එක සේව් වුණ ගමන්ම, අපේ ලිස්ට් එක ආයෙත් අලුත් (Refresh) කරනවා
            })
            .catch((error) => {
                console.error("සේව් වෙද්දී දෝෂයක්:", error);
            });
    };

    // 4. පෙනුම (UI එක)
    return (
        <div style={{ padding: '30px', fontFamily: 'Arial', maxWidth: '500px', margin: 'auto' }}>
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

            {/* Database එකෙන් ගෙනාපු දත්ත ටික පෙන්වීම */}
            <h3>මගේ වැඩ ලිස්ට් එක:</h3>
            <ul style={{ listStyleType: 'none', padding: 0 }}>
                {tasksList.map((t) => (
                    <li key={t.id} style={{ padding: '10px', backgroundColor: '#f4f4f4', marginBottom: '8px', borderRadius: '4px', borderLeft: '5px solid #28a745' }}>
                        {t.taskName}
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default App;