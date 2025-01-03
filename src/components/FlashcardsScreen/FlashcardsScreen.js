import React, { useState, useEffect } from 'react';
import './FlashcardsScreen.css';
import HeaderNav from '../HeaderNav/HeaderNav.js';
import PlusIcon from '../../assets/plus.svg';
import PlayIcon from '../../assets/play.svg';
import PlusIconWhite from '../../assets/add_plus_white.svg';
import { trackEvent } from '../../utils/amplitude';

const FlashcardsScreen = ({ topic, flashcards, onAddCard, onBack, onEditCard, onUpdateTopic, onFlip, onDeleteCard }) => {
    const [isEditing, setIsEditing] = useState(false);
    const [editableTopic, setEditableTopic] = useState(topic);
    const [slidingIndex, setSlidingIndex] = useState(null);
    const [touchStartX, setTouchStartX] = useState(0);
    const [touchEndX, setTouchEndX] = useState(0);

    useEffect(() => {
        trackEvent('Topic Page with words list opened');
    }, []);

    const handleTitleClick = () => {
        trackEvent('Topic Title Clicked to Edit', {
            topic,
            timestamp: new Date().toISOString(),
        });
    
        setIsEditing(true);
    };

    const handleBackClick = () => {
        trackEvent('Back Button on Flashcards Page Clicked', {
            topic,
            wordCount: flashcards.length,
            timestamp: new Date().toISOString(),
        });
    
        onBack();
    };    
    
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

    const handleTouchStart = (index, e) => {
        setTouchStartX(e.touches[0].clientX);
        setSlidingIndex(null);
    };

    const handleTouchMove = (e) => {
        setTouchEndX(e.touches[0].clientX);
    };

    const handleTouchEnd = (index) => {
        const swipeDistance = touchStartX - touchEndX;
        if (swipeDistance > 50) {
            setSlidingIndex(index);
        } else {
            setSlidingIndex(null);
        }
    };

    const handleAddWordClick = () => {
        trackEvent('Add Word Button Clicked', { topic, wordCount: flashcards.length });
        onAddCard();
    };

    const handleAddFirstWordClick = () => {
        trackEvent('Add First Word Button Clicked', { topic });
        onAddCard();
    };

    const handleDeleteClick = (card) => {
        trackEvent('Flashcard Deleted', {
            topic: topic,
            word: card.word,
            meaning: card.meaning,
            timestamp: new Date().toISOString(),
        });

        onDeleteCard(card.id);
    };

    return (
        <div className="screen fade-in">
            <div>
                <HeaderNav title="Topics" onClick={handleBackClick} />
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

                {flashcards.length > 0 && (
                    <div className="scrollable-container">
                        <ul className="flashcards-list">
                            {flashcards.map((card, index) => (
                                <li
                                    key={card.id}
                                    className={`flashcard-item ${slidingIndex === index ? 'sliding' : ''}`}
                                    onTouchStart={(e) => handleTouchStart(index, e)}
                                    onTouchMove={handleTouchMove}
                                    onTouchEnd={() => handleTouchEnd(index)}
                                >
                                    <div className="flashcard-content" onClick={() => onEditCard(card)}>
                                        <span className="flashcard-word font-regular">{card.word}</span>
                                        <span className="flashcard-meaning font-regular">{card.meaning}</span>
                                    </div>
                                    <button
                                        className="delete-btn text-white"
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            handleDeleteClick(card);
                                        }}
                                    >
                                        Delete
                                    </button>
                                </li>
                            ))}
                        </ul>
                    </div>
                )}
            </div>

            <div className="btn-group">
                {flashcards.length === 0 ? (
                    <div className='add-first-word-container'>
                        <span className='font-title'>No Words Yet</span>
                        <span className='add-first-word-hint'>Click below to add word</span>
                        <button
                            type="button"
                            className="btn font-regular btn-initial btn-blue"
                            onClick={handleAddFirstWordClick}
                        >
                            <img src={PlusIconWhite} alt="plus icon" className="btn-gap" />
                            <span className="text-white">Add First Word</span>
                        </button>
                    </div>
                ) : (
                    <>
                        <button
                            type="button"
                            className="btn font-regular btn-initial"
                            onClick={handleAddWordClick}
                        >
                            <img src={PlusIcon} alt="plus icon" className="btn-gap" />
                            <span className="text-blue">Add Word</span>
                        </button>

                        <button
                            type="button"
                            className="btn font-regular btn-initial btn-blue"
                            onClick={() => {
                                trackEvent('Flip That Button Clicked', {
                                    topic,
                                    wordCount: flashcards.length,
                                    timestamp: new Date().toISOString(),
                                });

                                onFlip();
                            }}
                        >
                            <img src={PlayIcon} alt="plus icon" className="btn-gap" />
                            <span className="text-white">Flip That</span>
                        </button>
                    </>
                )}
            </div>
        </div>
    );
};

export default FlashcardsScreen;
