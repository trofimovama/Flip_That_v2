import React, { useEffect } from 'react';
import './App.css';
import InitialScreen from './components/InitialScreen/InitialScreen';
import initializeAmplitude, { trackEvent } from './utils/amplitude';
import { UAParser } from 'ua-parser-js';

function App() {
    useEffect(() => {
        initializeAmplitude();

        const parser = new UAParser();
        const deviceInfo = parser.getResult();

        const userData = {
            language: navigator.language || "en",
            deviceType: `${deviceInfo.device.vendor} ${deviceInfo.device.model}` || "Unknown Device",
            platform: `${deviceInfo.os.name} ${deviceInfo.os.version}` || "Unknown OS",
            timestamp: new Date().toISOString(),
        };

        trackEvent('App Opened', userData);
    }, []);

    return (
        <div className="App">
            <InitialScreen />
        </div>
    );
}

export default App;
