import React, { useEffect, useState } from 'react';
import './App.css';
import InitialScreen from './components/InitialScreen/InitialScreen';

function App() {
    const [botStatus, setBotStatus] = useState('Loading...');

    useEffect(() => {
        fetch('/api/status') // backend endpoint !!!
            .then((response) => response.json())
            .then((data) => setBotStatus(data.status))
            .catch((error) => {
                setBotStatus("Failed to connect to the bot");
            });
    }, []);

    return (
        <div className="App">
            <InitialScreen />
        </div>
    );
}

export default App;
