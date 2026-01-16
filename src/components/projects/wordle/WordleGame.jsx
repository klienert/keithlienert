import React from "react";
import { useWordleContext } from "./wordle-context";
import Board from "./Board";
import Keyboard from "./Keyboard";
import GameOver from "./GameOver";

const WordleGame = () => {
    const { gameStatus, correctWord } = useWordleContext();

    return (
        <div className="wordle-container">
            <div className="wordle-nav">
                <h2 className="wordle-title">Wordle</h2>
            </div>            
            <div className="wordle-game">
                <Board />
                {gameStatus === 'playing' ? (
                    <Keyboard />
                ) : (
                    <GameOver />
                )}
            </div>
        </div>
    )
}

export default WordleGame;