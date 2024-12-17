import React, { useState, useEffect } from 'react';
import './InitialScreen.css';
import logo from '../../assets/logo_big.svg';
import FlashcardsScreen from '../FlashcardsScreen/FlashcardsScreen';
import TopicsScreen from '../TopicsScreen/TopicsScreen';
import AddCardScreen from '../AddCardScreen/AddCardScreen';
import AddTopicScreen from '../AddTopicScreen/AddTopicScreen';
import FirstFlashcardScreen from '../FirstFlashCardScreen/FirstFlashcardScreen';
import EditCardScreen from '../EditCardScreen/EditCardScreen';
import GameScreen from '../GameScreen/GameScreen';
import ProgressScreen from '../ProgressScreen/ProgressScreen';

const InitialScreen = () => {
    const [formData, setFormData] = useState({ word: '', meaning: '', topic: '' });
    const [validationErrors, setValidationErrors] = useState({ word: '', meaning: '', topic: '' });
    const [flashcards, setFlashcards] = useState([]);
    const [currentTopic, setCurrentTopic] = useState(null);
    const [currentCard, setCurrentCard] = useState(null);
    const [currentScreen, setCurrentScreen] = useState("logo");
    const [fadeOut, setFadeOut] = useState(false);
    const [currentTopicTitle, setCurrentTopicTitle] = useState('');
    const [currentWordsCount, setCurrentWordsCount] = useState(0);
    const [progressData, setProgressData] = useState({ knownCount: 0, notKnownCount: 0 });
    const [selectedFlashcards, setSelectedFlashcards] = useState([]);

    useEffect(() => {
        const storedFlashcards = localStorage.getItem('flashcards');
        if (storedFlashcards) setFlashcards(JSON.parse(storedFlashcards));

        const timer = setTimeout(() => setFadeOut(true), 2000);
        const hideLogoScreenTimer = setTimeout(() => setCurrentScreen("topics"), 2500);

        return () => {
            clearTimeout(timer);
            clearTimeout(hideLogoScreenTimer);
        };
    }, []);

    useEffect(() => {
        localStorage.setItem('flashcards', JSON.stringify(flashcards));
    }, [flashcards]);

    const handleRetryUnlearnedWords = () => {
        const topicCards = flashcards.find((f) => f.topic === currentTopic)?.cards || [];
        const unlearnedWords = topicCards.filter(
            (card) => progressData.notKnownCards?.includes(card.id)
        );
        setSelectedFlashcards(unlearnedWords);
        setCurrentScreen("game");
    }; 

    const handleUpdateTopic = (newTopicName) => {
        setFlashcards((prevFlashcards) =>
            prevFlashcards.map((topic) =>
                topic.topic === currentTopic
                    ? { ...topic, topic: newTopicName }
                    : topic
            )
        );
        setCurrentTopic(newTopicName);
    };
    
    const handleAddTopic = (newTopic) => {
        setFlashcards((prevFlashcards) => [
            ...prevFlashcards,
            { topic: newTopic, cards: [] }
        ]);
        setCurrentScreen("topics");
    };    

    const handleAddCard = (newCard) => {
        setFlashcards((prevFlashcards) =>
            prevFlashcards.map((topic) => {
                if (topic.topic === currentTopic) {
                    const cardWithId = { ...newCard, id: Date.now() };
                    return {
                        ...topic,
                        cards: topic.cards ? [...topic.cards, cardWithId] : [cardWithId],
                    };
                }
                return topic;
            })
        );
        setCurrentScreen("flashcards");
    };    

    const handleEditCard = (card) => {
        setCurrentCard(card);
        setCurrentScreen("editCard");
    };

    const handleSaveCard = (updatedCard) => {
        setFlashcards((prevFlashcards) =>
            prevFlashcards.map((topic) =>
                topic.topic === currentTopic
                    ? {
                          ...topic,
                          cards: topic.cards.map((card) =>
                              card.id === updatedCard.id ? updatedCard : card
                          ),
                      }
                    : topic
            )
        );
        setCurrentScreen("flashcards");
    };  

    const handleDeleteTopic = (topicToDelete) => {
        setFlashcards((prevFlashcards) =>
            prevFlashcards.filter((flashcard) => flashcard.topic !== topicToDelete)
        );
    };

    const handleGameFinish = (data) => {
        setProgressData({
            knownCount: data.knownCount,
            notKnownCount: data.notKnownCount,
            knownCards: data.knownCards,
            notKnownCards: data.notKnownCards,
        });
        setCurrentScreen('progress');
    };
    

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({ ...prevData, [name]: value }));
        setValidationErrors((prevErrors) => ({ ...prevErrors, [name]: '' }));
    };

    const handleSubmit = () => {
        const errors = {};
        if (!formData.word.trim()) errors.word = 'Let’s add word';
        if (!formData.meaning.trim()) errors.meaning = 'Let’s add meaning';
        if (!formData.topic.trim()) errors.topic = 'Let’s add name of the topic';
    
        setValidationErrors(errors);
    
        if (Object.keys(errors).length === 0) {
            setFlashcards((prevFlashcards) => {
                const topicIndex = prevFlashcards.findIndex(
                    (topic) => topic.topic === formData.topic
                );
    
                if (topicIndex !== -1) {
                    const updatedFlashcards = [...prevFlashcards];
                    updatedFlashcards[topicIndex].cards = [
                        ...(updatedFlashcards[topicIndex].cards || []),
                        { word: formData.word, meaning: formData.meaning, id: Date.now() },
                    ];
                    return updatedFlashcards;
                } else {
                    return [
                        ...prevFlashcards,
                        {
                            topic: formData.topic,
                            cards: [
                                { word: formData.word, meaning: formData.meaning, id: Date.now() },
                            ],
                        },
                    ];
                }
            });
    
            setCurrentTopic(formData.topic);
            setCurrentScreen("flashcards");
            setFormData({ word: '', meaning: '', topic: '' });
        }
    };

    const handleSelectTopic = (topic) => {
        setCurrentTopic(topic);
        setCurrentScreen("flashcards");
    };

    const handleBackToTopics = () => setCurrentScreen("topics");
    const handleGoToAddWordScreen = () => setCurrentScreen("addWord");
    const handleGoToAddTopicScreen = () => setCurrentScreen("addTopic");
    const handleGoToGameScreen = () => {
        const topic = flashcards.find((t) => t.topic === currentTopic);
        if (topic) {
            setCurrentTopicTitle(topic.topic);
            setCurrentWordsCount(topic.cards.length);
            setSelectedFlashcards(topic.cards);
        }
        setCurrentScreen("game");
    };


    const uniqueTopics = flashcards.length
        ? [...new Set(flashcards.map((card) => card.topic).filter(Boolean))]
        : [];

    if (currentScreen === "logo") {
        return (
            <div className={`initial-screen-container ${fadeOut ? 'fade-out' : ''}`}>
                <img src={logo} alt="Logo" className="initial-logo" />
                <span className="initial-descr">Learn Anything with Flash Cards</span>
            </div>
        );
    }

    const currentSessionFlashcards = selectedFlashcards.length
    ? selectedFlashcards
    : flashcards.find((f) => f.topic === currentTopic)?.cards || [];

    if (uniqueTopics.length === 0) {
        return (
            <FirstFlashcardScreen
                formData={formData}
                validationErrors={validationErrors}
                onChange={handleChange}
                onSubmit={handleSubmit}
            />
        );
    }

    return (
        <div className="container">
            {currentScreen === "topics" && (
                <TopicsScreen
                    topics={uniqueTopics}
                    onSelectTopic={handleSelectTopic}
                    onGoToAddTopicScreen={handleGoToAddTopicScreen}
                    onDeleteTopic={handleDeleteTopic}
                />
            )}
            {currentScreen === "flashcards" && (
                <FlashcardsScreen
                    topic={currentTopic}
                    flashcards={
                        flashcards.find((card) => card.topic === currentTopic)?.cards || []
                    }
                    onAddCard={handleGoToAddWordScreen}
                    onEditCard={handleEditCard}
                    onBack={handleBackToTopics}
                    onUpdateTopic={handleUpdateTopic}
                    onFlip={handleGoToGameScreen}
                />
            )}
            {currentScreen === "addWord" && (
                <AddCardScreen
                    onAddCard={handleAddCard}
                    onBack={() => setCurrentScreen("flashcards")}
                    topicTitle={currentTopic}
                />
            )}
            {currentScreen === "addTopic" && (
                <AddTopicScreen
                    onAddTopic={handleAddTopic}
                    onBack={handleBackToTopics}
                />
            )}
            {currentScreen === "editCard" && (
                <EditCardScreen
                    card={currentCard}
                    onSaveCard={handleSaveCard}
                    onBack={() => setCurrentScreen("flashcards")}
                />
            )}
            {currentScreen === "firstFlashcard" && (
                <FirstFlashcardScreen
                    formData={formData}
                    validationErrors={validationErrors}
                    onChange={handleChange}
                    onSubmit={handleSubmit}
                />
            )}
            {currentScreen === "game" && (
                <GameScreen
                    onBack={() => setCurrentScreen("flashcards")}
                    topicTitle={currentTopicTitle}
                    wordsCount={currentWordsCount}
                    flashcards={currentSessionFlashcards}
                    onFinish={handleGameFinish}
                />
            )}
            {currentScreen === "progress" && (
                <ProgressScreen
                    onBack={() => setCurrentScreen("topics")}
                    onStartAgain={() => {
                        setSelectedFlashcards(flashcards.find((f) => f.topic === currentTopic)?.cards || []);
                        setCurrentScreen("game");
                    }}
                    onRetryUnlearnedWords={handleRetryUnlearnedWords}
                    onFinish={() => setCurrentScreen("topics")}
                    progressData={progressData}
                    topicTitle={currentTopicTitle}
                    totalWords={currentSessionFlashcards.length}
                />
            )}
        </div>
    );
};

export default InitialScreen;
