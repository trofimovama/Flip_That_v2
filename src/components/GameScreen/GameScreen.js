import React, { useState } from 'react';
import './GameScreen.css';
import HeaderNav from '../HeaderNav/HeaderNav';
import OrangeArrowLeft from '../../assets/orange_arrow_left.svg';
import GreenArrowRight from '../../assets/green_arrow_right.svg';

const GameScreen = ({ onBack, topicTitle, flashcards = [], onFinish }) => {
    const [currentWordIndex, setCurrentWordIndex] = useState(0);
    const [knownCount, setKnownCount] = useState(0);
    const [notKnownCount, setNotKnownCount] = useState(0);
    const [showMeaning, setShowMeaning] = useState(false);
    const [knownCards, setKnownCards] = useState([]);
    const [notKnownCards, setNotKnownCards] = useState([]);

    const handleNext = () => {
        if (currentWordIndex < flashcards.length - 1) {
            setCurrentWordIndex(currentWordIndex + 1);
        } else {
            onFinish({
                knownCount,
                notKnownCount,
                knownCards,
                notKnownCards,
            });
        }
    };

    const markAsKnown = () => {
        setKnownCards((prev) => [...prev, flashcards[currentWordIndex].id]);
        setKnownCount((prev) => prev + 1);
        handleNext();
    };

    const markAsNotKnown = () => {
        setNotKnownCards((prev) => [...prev, flashcards[currentWordIndex].id]);
        setNotKnownCount((prev) => prev + 1);
        handleNext();
    };

    const toggleCard = () => {
        setShowMeaning((prev) => !prev);
    };

    if (!flashcards.length) {
        return (
            <div className="game-screen fade-in">
                <HeaderNav title="Cancel" onClick={onBack} />
                <div className="game-container">
                    <span>No flashcards available for this topic</span>
                </div>
            </div>
        );
    }

    return (
        <div className="game-screen fade-in">
            <HeaderNav title="Cancel" onClick={onBack} />
            <div className="game-container">
                <div className="game-info">
                    <div className="counter not-known-counter">{notKnownCount}</div>
                    <div className="game-progress">
                        {currentWordIndex + 1}/{flashcards.length}
                    </div>
                    <div className="counter known-counter">{knownCount}</div>
                </div>
                <span className="game-topic-title font-regular">{topicTitle}</span>
                <div className="flashcard-container">
                    <div
                        className={`flashcard ${showMeaning ? 'flashcard-flipped' : ''}`}
                        onClick={toggleCard}
                    >
                        <span className={`${showMeaning ? 'flash-word' : ''}`}>{flashcards[currentWordIndex].word}</span>
                        <span className={`${showMeaning ? 'flash-meaning' : ''}`}>{showMeaning && flashcards[currentWordIndex].meaning} </span> 
                    </div>
                </div>
                <span className="flashcard-info font-regular">To flip card, tap on it</span>
                <div className="action-buttons">
                    <button className="button-controls btn-not-known" onClick={markAsNotKnown}>
                        <img src={OrangeArrowLeft} alt="arrow left" />
                        <span className="font-regular">Mark as Not Known</span>
                    </button>
                    <button className="button-controls btn-known" onClick={markAsKnown}>
                        <span className="font-regular">Mark as Known</span>
                        <img src={GreenArrowRight} alt="arrow left" />
                    </button>
                </div>
                <span className="game-footer">Finish Session</span>
            </div>
        </div>
    );
};

export default GameScreen;
