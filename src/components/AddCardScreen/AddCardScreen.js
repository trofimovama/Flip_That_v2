import React, { useState } from 'react';
import './AddCardScreen.css';
import HeaderNav from '../HeaderNav/HeaderNav.js';
import InputField from '../InputField/InputField.js';
import { trackEvent } from '../../utils/amplitude';

const AddCardScreen = ({ onAddCard, onBack, topicTitle }) => {
    const [formData, setFormData] = useState({ word: '', meaning: '' });
    const [validationErrors, setValidationErrors] = useState({ word: '', meaning: '' });

    const handleBackClick = () => {
        trackEvent('Back Button Clicked on Add Card', {
            topicTitle,
            word: formData.word,
            meaning: formData.meaning,
            timestamp: new Date().toISOString(),
        });
    
        onBack();
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
        setValidationErrors((prevErrors) => ({
            ...prevErrors,
            [name]: '',
        }));
    };

    const handleSubmit = () => {
        const errors = {};
        if (!formData.word.trim()) errors.word = 'Please add a word';
        if (!formData.meaning.trim()) errors.meaning = 'Please add a meaning';

        setValidationErrors(errors);

        if (Object.keys(errors).length === 0) {
            onAddCard({ word: formData.word, meaning: formData.meaning });
            onBack();
        }
    };

    return (
        <div className="screen fade-in">
            <div>
                <HeaderNav title={topicTitle || "Cancel"} onClick={handleBackClick} />
                <div className="field-group">
                    <span className="font-title initial-title">Add new card</span>
                    <InputField
                        label="WORD"
                        name="word"
                        value={formData.word}
                        placeholder="Enter word"
                        onChange={handleChange}
                        errorMessage={validationErrors.word}
                    />
                    <InputField
                        label="MEANING"
                        name="meaning"
                        value={formData.meaning}
                        placeholder="Enter meaning"
                        onChange={handleChange}
                        errorMessage={validationErrors.meaning}
                    />
                </div>
            </div>
            <button type="button" className="btn btn-blue font-regular" onClick={handleSubmit}>
                Add Card
            </button>
        </div>
    );
};

export default AddCardScreen;
