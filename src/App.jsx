import { useState } from 'react';
import axios from 'axios';
import './App.css';

function App() {
    // 1. මතකය: අපි කොටුවේ ටයිප් කරන දේ මතක තියාගන්නේ මෙතන
    const [task, setTask] = useState('');

    // 2. මෙහෙයුම: බොත්තම එබුවාම වෙන දේ
    const handleAddTask = () => {
        // Axios (වෝකි-ටෝකිය) පාවිච්චි කරලා වේටර්ට (API එකට) POST request එකක් යවනවා
        axios.post('http://localhost:8080/tasks', {
            taskName: task,
            completed: false
        })
            .then((response) => {
                // වේටර් "සාර්ථකයි" කිව්වොත් මේ ටික වෙනවා
                alert('වැඩේ සාර්ථකව Database එකට සේව් වුණා!');
                setTask(''); // සේව් වුණාට පස්සේ ටයිප් කරපු කොටුව ආයේ හිස් කරනවා
            })
            .catch((error) => {
                // මොකක්හරි දෝෂයක් ආවොත් මේක එනවා
                console.error("දෝෂයක්:", error);
                alert('සේව් වෙද්දී අවුලක් ගියා! Spring Boot එක Run වෙනවද බලන්න.');
            });
    };

    // 3. පෙනුම (UI එක)
    return (
        <div style={{ padding: '30px', fontFamily: 'Arial' }}>
            <h1>Task Manager App 🚀</h1>

            {/* දත්ත ඇතුලත් කරන කොටුව */}
            <input
                type="text"
                placeholder="අලුත් වැඩක් ටයිප් කරන්න..."
                value={task}
                onChange={(e) => setTask(e.target.value)}
                style={{ padding: '10px', width: '250px', marginRight: '10px' }}
            />

            {/* සේව් කරන බොත්තම */}
            <button onClick={handleAddTask} style={{ padding: '10px', cursor: 'pointer' }}>
                Add Task
            </button>
        </div>
    );
}

export default App;