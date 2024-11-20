import React from 'react';
import InputField from '../InputField/InputField';
import './FirstFlashcardScreen.css';

const FirstFlashcardScreen = ({ formData, validationErrors, onChange, onSubmit }) => {
    return (
        <div className='container'>
            <div className="input-screen-container fade-in">
                <div className="field-group">
                    <span className="font-title initial-title">Create your first flashcard</span>
                    <InputField
                        label="word"
                        name="word"
                        value={formData.word}
                        placeholder="E.g. cat"
                        onChange={onChange}
                        errorMessage={validationErrors.word}
                    />
                    <InputField
                        label="meaning"
                        name="meaning"
                        value={formData.meaning}
                        placeholder="E.g. translation, meaning"
                        onChange={onChange}
                        errorMessage={validationErrors.meaning}
                    />
                    <InputField
                        label="topic"
                        name="topic"
                        value={formData.topic}
                        placeholder="E.g. Spanish words, driving rules"
                        onChange={onChange}
                        errorMessage={validationErrors.topic}
                    />
                </div>
                <button
                    type="button"
                    className="btn btn-blue font-regular btn-initial"
                    onClick={onSubmit}
                >
                    Create Flashcard
                </button>
            </div>
        </div>
    );
};

export default FirstFlashcardScreen;
