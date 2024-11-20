import React, { useState } from 'react';
import './FlashcardsScreen.css';
import HeaderNav from '../HeaderNav/HeaderNav.js';
import PlusIcon from '../../assets/plus.svg';
import PlayIcon from '../../assets/play.svg';

const FlashcardsScreen = ({ topic, flashcards, onAddCard, onBack, onEditCard, onUpdateTopic, onFlip }) => {
    const [isEditing, setIsEditing] = useState(false);
    const [editableTopic, setEditableTopic] = useState(topic);

    const handleTitleClick = () => setIsEditing(true);

    const handleChange = (e) => setEditableTopic(e.target.value);

    const handleDone = () => {
        setIsEditing(false);
        if (editableTopic.trim() && editableTopic !== topic) {
            onUpdateTopic(editableTopic);
        }
    };

    const handleKeyDown = (e) => {
        if (e.key === 'Enter') handleDone();
    };

    return (
        <div className="screen fade-in">
            <div>
                <HeaderNav title="Topics" onClick={onBack} />
                {isEditing ? (
                    <input
                        type="text"
                        className="editable-title font-title"
                        value={editableTopic}
                        onChange={handleChange}
                        onBlur={handleDone}
                        onKeyDown={handleKeyDown}
                        autoFocus
                    />
                ) : (
                    <div className="flashcard-title-container">
                        <span className="font-title" onClick={handleTitleClick}>
                            {editableTopic}
                        </span>
                        <span className="text-secondary topic-subtitle">
                            {flashcards.length} {flashcards.length === 1 ? 'word' : 'words'}
                        </span>
                    </div>
                )}
                <div className="scrollable-container">
                    <ul className="flashcards-list">
                        {flashcards.map((card, index) => (
                            <li
                                key={index}
                                className="flashcard-item"
                                onClick={() => onEditCard(card)}
                            >
                                <span className="flashcard-word font-regular">{card.word}</span>
                                <span className="flashcard-meaning font-regular">{card.meaning}</span>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
            <div className="btn-group">
                <button type="button" className="btn font-regular btn-initial" onClick={onAddCard}>
                    <img src={PlusIcon} alt="plus icon" className="btn-gap" />
                    <span className="text-blue">Add Word</span>
                </button>

                <button type="button" className="btn font-regular btn-initial btn-blue" onClick={onFlip}>
                    <img src={PlayIcon} alt="plus icon" className="btn-gap" />
                    <span className="text-white">Flip That</span>
                </button>
            </div>
        </div>
    );
};

export default FlashcardsScreen;
