import React, { useState, useEffect } from 'react';
import './InputField.css';
import Tick from '../../assets/tick.svg';
import ThinkSmile from '../../assets/think_emoji.png';

const InputField = ({ label, value, placeholder, onChange, type = 'text', name, enterKeyHint = 'done', errorMessage }) => {
    const [isValid, setIsValid] = useState(false);

    useEffect(() => {
        setIsValid(value.trim() !== '');
    }, [value]);

    return (
        <div className="input-field-container">
            {label && <label htmlFor={name} className="input-label">{label}</label>}
            <div className="input-wrapper">
                <input
                    id={name}
                    type={type}
                    name={name}
                    value={value}
                    placeholder={placeholder}
                    onChange={onChange}
                    className={`input-field font-regular ${isValid ? 'valid' : ''} ${errorMessage ? 'error' : ''}`}
                    enterKeyHint={enterKeyHint}
                />
                {isValid && !errorMessage && <img className="valid-icon" src={Tick} alt="tick" />}
            </div>
            {errorMessage && 
            <div className='error-container'>
                <img src={ThinkSmile} alt='Think smile' className='emoji-icon'/>
                <span className="error-message font-sub">{errorMessage}</span>
            </div>
            }
        </div>
    );
};

export default InputField;
