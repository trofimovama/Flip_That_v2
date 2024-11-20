import React from 'react';
import './HeaderNav.css';
import ArrowLeft from '../../assets/arrow_left.svg';

const BackButton = ({ title, onClick }) => {
    return (
        <div className='header-link'>
            <button className="link-btn font-regular" onClick={onClick}>
                <img src={ArrowLeft} alt="arrow left" className="back-button-icon" />
                <span>{title}</span>
            </button>
            <span className='header-divider'></span>
        </div>
    );
};

export default BackButton;
