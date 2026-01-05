import React, { useState, useEffect, createContext } from "react";
import { boardDefault, generateWordSet, blankBoard } from "./words/Words";
import Board from './Board';

export const WordleContext = createContext();

const Wordle = () => {
    const [board, setBoard] = useState(blankBoard);
    const [currAttempt, setCurrAttempt] = useState({attempt: 0, letterPos: 0});
    const [attempts, setAttempts] = useState({attempt: 0, desc: []});
    const [wordSet, setWordSet] = useState(new Set());
    const [disabledLetters, setDisabledLetters] = useState(new Set());
    const [correctLetters, setCorrectLetters] = useState(new Set());
    const [presentLetters, setPresentLetters] = useState(new Set());
    const [correctWord, setCorrectWord] = useState("");


    const [gameOver, setGameOver] = useState({
        gameOver: false, 
        guessedWord: false
    });

    useEffect(() => {
        generateWordSet().then((words) => {
            setWordSet(words.wordSet);
            // setCorrectWord(words.todaysWord);
            setCorrectWord('TIGHT');
        });
        console.log(board);

    },[]);

    return (
        <div>
            <div className="wordle-nav">
                <h2>Wordle</h2>
            </div>
            <WordleContext.Provider
                value={
                    board,
                    setBoard
                }
            >
                <div className="wordle-game">
                    {/* <Board /> */}
                    {/* gameOver --> <GameOver /> : <Keyboard /> */}
                </div>
            </WordleContext.Provider>
        </div>
    )
}

export default Wordle;