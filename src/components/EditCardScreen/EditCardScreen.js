import React, { useState } from 'react';
import './EditCardScreen.css';
import HeaderNav from '../HeaderNav/HeaderNav';
import InputField from '../InputField/InputField';

const EditCardScreen = ({ card, onSaveCard, onBack }) => {
    const [formData, setFormData] = useState({ word: card.word, meaning: card.meaning });
    const [validationErrors, setValidationErrors] = useState({ word: '', meaning: '' });

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

    const handleSave = () => {
        const errors = {};
        if (!formData.word.trim()) errors.word = 'Word cannot be empty';
        if (!formData.meaning.trim()) errors.meaning = 'Meaning cannot be empty';

        setValidationErrors(errors);

        if (Object.keys(errors).length === 0) {
            onSaveCard({ ...card, ...formData });
            onBack();
        }
    };

    return (
        <div className="screen fade-in">
            <div>
                <HeaderNav title="Cancel" onClick={onBack} />
                <span className="font-title text-blue add-topic-title">Edit Card</span>
                <div className="field-group">
                    <InputField
                        label="Word"
                        name="word"
                        value={formData.word}
                        placeholder="Enter word"
                        onChange={handleChange}
                        errorMessage={validationErrors.word}
                    />
                    <InputField
                        label="Meaning"
                        name="meaning"
                        value={formData.meaning}
                        placeholder="Enter meaning"
                        onChange={handleChange}
                        errorMessage={validationErrors.meaning}
                    />
                </div>
            </div>
            <button className="btn btn-blue font-regular" onClick={handleSave}>
                Save
            </button>
        </div>
    );
};

export default EditCardScreen;
