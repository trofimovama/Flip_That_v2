import React, { useState } from 'react';
import './GameScreen.css';
import HeaderNav from '../HeaderNav/HeaderNav';
import OrangeArrowLeft from '../../assets/orange_arrow_left.svg';
import GreenArrowRight from '../../assets/green_arrow_right.svg';
import { trackEvent } from '../../utils/amplitude';

const GameScreen = ({ onBack, topicTitle, flashcards = [], onFinish }) => {
    const [currentWordIndex, setCurrentWordIndex] = useState(0);
    const [knownCount, setKnownCount] = useState(0);
    const [notKnownCount, setNotKnownCount] = useState(0);
    const [showMeaning, setShowMeaning] = useState(false);
    const [knownCards, setKnownCards] = useState([]);
    const [notKnownCards, setNotKnownCards] = useState([]);

    const handleNext = (updatedKnownCount, updatedNotKnownCount, updatedKnownCards, updatedNotKnownCards) => {
        if (currentWordIndex < flashcards.length - 1) {
            setCurrentWordIndex(currentWordIndex + 1);
        } else {
            trackEvent('Finish Session Clicked', {
                topic: topicTitle,
                knownCount: updatedKnownCount,
                notKnownCount: updatedNotKnownCount,
                timestamp: new Date().toISOString(),
            });
            onFinish({
                knownCount: updatedKnownCount,
                notKnownCount: updatedNotKnownCount,
                knownCards: updatedKnownCards,
                notKnownCards: updatedNotKnownCards,
            });
        }
    };

    const markAsKnown = () => {
        const updatedKnownCards = [...knownCards, flashcards[currentWordIndex].id];
        const updatedKnownCount = knownCount + 1;

        trackEvent('I Know It Clicked', {
            topic: topicTitle,
            word: flashcards[currentWordIndex].word,
            currentIndex: currentWordIndex + 1,
            totalCards: flashcards.length,
            timestamp: new Date().toISOString(),
        });

        setKnownCards(updatedKnownCards);
        setKnownCount(updatedKnownCount);

        handleNext(updatedKnownCount, notKnownCount, updatedKnownCards, notKnownCards);
    };

    const markAsNotKnown = () => {
        const updatedNotKnownCards = [...notKnownCards, flashcards[currentWordIndex].id];
        const updatedNotKnownCount = notKnownCount + 1;

        trackEvent('Go Over Clicked', {
            topic: topicTitle,
            word: flashcards[currentWordIndex].word,
            currentIndex: currentWordIndex + 1,
            totalCards: flashcards.length,
            timestamp: new Date().toISOString(),
        });

        setNotKnownCards(updatedNotKnownCards);
        setNotKnownCount(updatedNotKnownCount);

        handleNext(knownCount, updatedNotKnownCount, knownCards, updatedNotKnownCards);
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
            <div className="game-container">
                <div className="game-info">
                    <div className='game-counter-container'>
                        <div className="counter not-known-counter">{notKnownCount}</div>
                        <div className="game-progress">
                            {currentWordIndex + 1}/{flashcards.length}
                        </div>
                        <div className="counter known-counter">{knownCount}</div>
                    </div>
                    <span className="game-topic-title font-regular">{topicTitle}</span>
                </div>
                <div className="flashcard-container">
                    <div
                        className={`flashcard ${showMeaning ? 'flashcard-flipped' : ''}`}
                        onClick={toggleCard}
                    >
                        <span className={`${showMeaning ? 'flash-word' : ''}`}>{flashcards[currentWordIndex].word}</span>
                        <span className={`${showMeaning ? 'flash-meaning' : ''}`}>{showMeaning && flashcards[currentWordIndex].meaning} </span> 
                    </div>
                    <span className="flashcard-info font-regular">To flip card, tap on it</span>
                </div>
                <div className="action-buttons">
                    <button className="button-controls btn-not-known" onClick={markAsNotKnown}>
                        <img src={OrangeArrowLeft} alt="arrow left" />
                        <span className="font-regular">Go over</span>
                    </button>
                    <button className="button-controls btn-known" onClick={markAsKnown}>
                        <span className="font-regular">I know it</span>
                        <img src={GreenArrowRight} alt="arrow left" />
                    </button>
                </div>
                <span
                    className="game-footer"
                    onClick={() => {
                        trackEvent('Finish Session Clicked', {
                            topic: topicTitle,
                            knownCount,
                            notKnownCount,
                            timestamp: new Date().toISOString(),
                        });
                        onBack();
                    }}
                >
                    Finish Session
                </span>
            </div>
        </div>
    );
};

export default GameScreen;
