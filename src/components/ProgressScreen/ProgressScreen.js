import React from 'react';
import './ProgressScreen.css';
import RepeatIcon from '../../assets/repeat.svg';

const ProgressScreen = ({
    onStartAgain,
    onRetryUnlearnedWords,
    onFinish,
    progressData,
    topicTitle,
    totalWords,
}) => {
    const knownPercentage = (progressData.knownCount / totalWords) * 100;

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
            <div className="start-again-group text-blue" onClick={onStartAgain}>
                <img src={RepeatIcon} alt="repeat icon" />
                <span>Start Again</span>
            </div>
            <div className='progress-footer'>
                <button className="btn font-regular btn-initial" onClick={onRetryUnlearnedWords}>
                    <span className='text-blue'>Retry Unlearned Words ({progressData.notKnownCount})</span>
                </button>
                <button className="btn font-regular btn-initial btn-blue" onClick={onFinish}>
                    <span>Finish</span>
                </button>
            </div>
        </div>
    );
};

export default ProgressScreen;
