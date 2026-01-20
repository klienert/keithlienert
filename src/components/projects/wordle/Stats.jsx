import React from "react";
import { useWordleContext } from "./wordle-context";

const GameStats = () => {
    const { stats, setShowStats } = useWordleContext();

    if (!stats.hasPlayed) {
        return (
            <div className="stats-overlay">
                <div className="stats-modal">
                    <h3>No Games Played yet!</h3>
                    <button
                        onClick={() => setShowStats(prev => !prev)}
                    >Close</button>
                </div>
            </div>
        )
    }

    const maxCount = Math.max(...Object.values(stats.guesses));
    
    return (
        <div className="stats-overlay" onClick={()=> setShowStats(prev => !prev)}>
            <div className="stats-modal" onClick={e => e.stopPropagation()}>
                <button className="stats-close-x" onClick={()=> setShowStats(prev => !prev)}>X</button>
                <h2>Statistics</h2>
                <div className="stats-grid">
                    <div className="stat">
                        <div className="stat-value">{stats.gamesWon}/{stats.gamesPlayed}</div>
                        <div className="stat-label">Wins/Played</div>
                    </div>
                    <div className="stat">
                        <div className="stat-value">{stats.winPercentage}%</div>
                        <div className="stat-label">Win %</div>
                    </div>
                    <div className="stat">
                        <div className="stat-value">{stats.currentStreak}</div>
                        <div className="stat-label">Current Streak</div>
                    </div>
                    <div className="stat">
                        <div className="stat-value">{stats.maxStreak}</div>
                        <div className="stat-label">Max Streak</div>
                    </div>
                </div>
                <h3>Guess Distribution</h3>
                <div className="stats-distribution">
                    {[1, 2, 3, 4, 5, 6].map(num => {
                        const count = stats.guesses[num];
                        const percentage = maxCount > 0 ? (count / maxCount) * 100 : 0;
                        const minWidth = count > 0 ? 6 : 0; // Minimum width for visibility
                        
                        return (
                            <div key={num} className="distribution-row">
                                <span className="guess-number">{num}</span>
                                <div 
                                    className="bar-container"
                                    style={{ 
                                        width: '100%'
                                    }}
                                >
                                    <div 
                                        className={`bar ${count > 0 ? 'has-count' : ''}`}
                                        style={{ 
                                            width: `${Math.max(percentage, minWidth)}%`
                                        }}
                                    >
                                        <span className="bar-count">{count}</span>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
                {stats.gamesWon > 0 && (
                    <div className="additional-stats">
                        <p>Average Guesses: <strong>{stats.averageGuesses}</strong></p>
                        {stats.isOnStreak && (
                        <p className="streak-indicator">&#128293; You're on a streak!</p>
                        )}
                    </div>
                )}
                <button
                    className="stats-close-btn"
                    onClick={() => setShowStats(prev => !prev)}
                >Close</button>
            </div>
        </div>
    )
}

export default GameStats;