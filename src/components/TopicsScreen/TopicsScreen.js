import React, { useState } from 'react';
import './TopicsScreen.css';
import AddIcon from '../../assets/add_plus.svg';
import ArrowRight from '../../assets/arrow_right.svg';
import GlassIcon from '../../assets/glass.svg';
import MicrophoneIcon from '../../assets/microphone.svg';

const TopicsScreen = ({ topics, onSelectTopic, onGoToAddTopicScreen, onDeleteTopic }) => {
    const [searchTerm, setSearchTerm] = useState("");
    const [slidingIndex, setSlidingIndex] = useState(null);
    const [touchStartX, setTouchStartX] = useState(0);
    const [touchEndX, setTouchEndX] = useState(0);

    const handleTopicClick = (topic) => {
        onSelectTopic(topic);
    };

    const handleDeleteClick = (topic) => {
        onDeleteTopic(topic);
    };

    const handleSearchChange = (e) => {
        setSearchTerm(e.target.value);
    };

    const handleTouchStart = (index, e) => {
        setTouchStartX(e.touches[0].clientX);
        setSlidingIndex(null)
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

    const filteredTopics = topics.filter((topic) =>
        topic.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="topics-screen">
            <div className="topics-container">
                <span className="font-title">Topics</span>
                <img src={AddIcon} alt="add icon" onClick={onGoToAddTopicScreen} />
            </div>
            <span className="text-secondary topic-subtitle">
                {filteredTopics.length} {filteredTopics.length === 1 ? 'topic' : 'topics'}
            </span>
            <div className="search-container">
                <img src={GlassIcon} alt="search icon" className="search-icon" />
                <input
                    type="text"
                    placeholder="Search"
                    value={searchTerm}
                    onChange={handleSearchChange}
                    className="search-input"
                />
                <img src={MicrophoneIcon} alt="microphone icon" className="microphone-icon" />
            </div>
            <div className="topics-list-wrapper">
                <ul className="topics-list">
                    {filteredTopics.map((topic, index) => (
                        <li
                            key={index}
                            className={`topic-item ${slidingIndex === index ? 'sliding' : ''}`}
                            onTouchStart={(e) => handleTouchStart(index, e)}
                            onTouchMove={handleTouchMove}
                            onTouchEnd={() => handleTouchEnd(index)}
                        >
                            <div className="topic-content" onClick={() => handleTopicClick(topic)}>
                                <span>{topic}</span>
                                <img src={ArrowRight} alt="arrow right" />
                            </div>
                            <button
                                className="delete-btn text-white"
                                onClick={(e) => {
                                    e.stopPropagation();
                                    handleDeleteClick(topic);
                                }}
                            >
                                Delete
                            </button>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default TopicsScreen;
