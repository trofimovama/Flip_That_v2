import React, { useState } from 'react';
import './AddTopicScreen.css';
import InputField from '../InputField/InputField';
import HeaderNav from '../HeaderNav/HeaderNav.js';

const AddTopicScreen = ({ onAddTopic, onBack }) => {
    const [newTopic, setNewTopic] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    const handleInputChange = (e) => {
        setNewTopic(e.target.value);
        setErrorMessage('');
    };

    const handleSave = () => {
        if (newTopic.trim()) {
            onAddTopic(newTopic.trim());
            onBack();
        } else {
            setErrorMessage("Please enter a topic name");
        }
    };

    return (
        <div className="add-topic-screen screen">
            <div>
                <HeaderNav title="Cancel" onClick={onBack} />
                <span className="font-title text-blue add-topic-title">Add New Topic</span>
                <InputField
                    label="Topic"
                    name="topic"
                    value={newTopic}
                    onChange={handleInputChange}
                    errorMessage={errorMessage}
                />
            </div>
            <button className="btn btn-blue font-regular" onClick={handleSave}>
                Add Topic
            </button>
        </div>
    );
};

export default AddTopicScreen;
