import React from "react";
import { useWordleContext } from "./wordle-context";

const GameOver = () => {
    const { gameStatus, correctWord,resetGame } = useWordleContext();

    return (
        <div className="wordle-game-over">
            {gameStatus === 'won' ? (
                <>
                    <h3>You Won!</h3>                    
                </>
            ) : (
                <>
                    <h3>Game Over</h3>
                    <p>Correct Word: <strong>{correctWord}</strong></p>
                </>
            )}
            <div className="wordle-reset">
                <button
                    onClick={resetGame}
                >Play Again?</button>
            </div>
        </div>
    )
}

export default GameOver;