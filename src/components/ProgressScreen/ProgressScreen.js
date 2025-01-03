import React from 'react';
import './ProgressScreen.css';
import RepeatIcon from '../../assets/repeat.svg';
import { trackEvent } from '../../utils/amplitude';

const ProgressScreen = ({
    onStartAgain,
    onRetryUnlearnedWords,
    onFinish,
    progressData,
    topicTitle,
    totalWords,
}) => {
    const knownPercentage = (progressData.knownCount / totalWords) * 100;

    const handleStartAgain = () => {
        trackEvent('Start Again Clicked', {
            topic: topicTitle,
            knownCount: progressData.knownCount,
            notKnownCount: progressData.notKnownCount,
            totalWords,
            timestamp: new Date().toISOString(),
        });
        onStartAgain();
    };

    const handleRetryUnlearnedWords = () => {
        trackEvent('Retry Unlearned Words Clicked', {
            topic: topicTitle,
            notKnownCount: progressData.notKnownCount,
            totalWords,
            timestamp: new Date().toISOString(),
        });
        onRetryUnlearnedWords();
    };

    const handleFinish = () => {
        trackEvent('Finish Clicked', {
            topic: topicTitle,
            knownCount: progressData.knownCount,
            notKnownCount: progressData.notKnownCount,
            totalWords,
            timestamp: new Date().toISOString(),
        });
        onFinish();
    };

    return (
        <div className="progress-screen fade-in">
            <div className='progress-info'>
                <span>{topicTitle}</span>
                <div className="dot"></div>
                <span>{totalWords}</span>
            </div>
            <span className="font-title initial-title">Results</span>
            <div className="progress-circle" style={{ '--known-percentage': knownPercentage }}>
                <div className="circle">
                    <div className="number">{progressData.knownCount}</div>
                </div>
            </div>
            <div className="start-again-group text-blue" onClick={handleStartAgain}>
                <img src={RepeatIcon} alt="repeat icon" />
                <span>Start Again</span>
            </div>
            <div className='progress-footer'>
                <button className="btn font-regular btn-initial" onClick={handleRetryUnlearnedWords}>
                    <span className='text-blue'>Retry Unlearned Words ({progressData.notKnownCount})</span>
                </button>
                <button className="btn font-regular btn-initial btn-blue" onClick={handleFinish}>
                    <span>Finish</span>
                </button>
            </div>
        </div>
    );
};

export default ProgressScreen;
