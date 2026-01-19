import React, { useEffect } from "react";
import { useWordleContext } from "./wordle-context";
import { IoStatsChartSharp } from "react-icons/io5";
import Board from "./Board";
import Keyboard from "./Keyboard";
import GameOver from "./GameOver";
import GameStats from "./Stats";

const WordleGame = () => {
    const { gameStatus, showStats, stats, setShowStats } = useWordleContext();

    useEffect(() => {
        console.log('stat? ', stats);
    },[]);

    return (
        <div className="wordle-container">
            <div className="wordle-header">
                <h2 className="wordle-title">Wordle</h2>
                <div className="wordle-stats">
                    <button
                        onClick={() => setShowStats(true)}
                        aria-label="statistic button"
                        alt='Statistics Button'
                    >{<IoStatsChartSharp size="1.5em"/>}</button>
                </div>
            </div>            
            <div className="wordle-game">
                <Board />
                {gameStatus === 'playing' ? (
                    <Keyboard />
                ) : (
                    <GameOver />
                )}
            </div>
            {showStats && <GameStats />}
        </div>
    )
}

export default WordleGame;