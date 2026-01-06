import React, { useState, useEffect, createContext } from "react";
import { boardDefault, generateWordSet, blankBoard } from "./words/Words";
import Board from './Board';
import WordleWord from './classes/WordleWord';
import '../../../assets/css/pages/projects/wordle.css';

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
    },[board]);

    // keyboard controls

    const onSelectLetter = (keyVal) => {
        if (currAttempt.letterPos > 4) return;
        const newBoard = [...board];
        newBoard[currAttempt.attempt][currAttempt.letterPos] = keyVal;
        setBoard(newBoard);
        setCurrAttempt({...currAttempt, letterPos: currAttempt.letterPos + 1});
    }

    const onDelete = () => {
        if (currAttempt.letterPos === 0) return;
        const newBoard = [...board];
        newBoard[currAttempt.attempt][currAttempt.letterPos - 1] = "";
        setBoard(newBoard);
        setCurrAttempt({...currAttempt, letterPos: currAttempt.letterPos - 1});
    }

    const onEnter = () => {
        if (currAttempt.attempt !== 5) return; // need to fill in 5 letters
        let currWord = "";
        for (let i = 0; i < 5; i++ ) {
            currWord += board[currAttempt.attempt][i];
        }

        if (wordSet.has(currWord.toLowerCase())) {
            setCurrAttempt({attempt: currAttempt.attempt + 1, letterPos: 0});            
        } else {
            alert("Word is not a Wordle word.");            
        }

        const wordCheck = new WordleWord(correctWord, currWord);
        const results = wordCheck.getResults();
        setAttempts(prev => ({
            attempt: prev.attempt + 1,
            desc: [...prev.desc, results.feedback]
        }));

        setDisabledLetters(prev => new Set([...prev, ...results.disabledLetters]));
        setCorrectLetters(prev => new Set([...prev, ...results.correctLetters]));
        setPresentLetters(prev => new Set([...prev, ...results.presentLetters]));

        // game won
        if (currWord === correctWord) {
            setGameOver({gameOver: true, guessedWord: true})
            return;
        }

        // game lost
        if (currAttempt === 5) {
            setGameOver({gameOver: true, guessedWord: false});
            return;
        }
    }

    return (
        <div className="wordle-container">
            <div className="wordle-nav">
                <h2 className="wordle-title">Wordle</h2>
            </div>
            <WordleContext.Provider
                value={{
                    board,
                    setBoard,
                    setCurrAttempt,
                    onEnter, 
                    onDelete, 
                    onSelectLetter,
                    correctWord,
                    disabledLetters,
                    correctLetters,
                    setCorrectLetters,
                    presentLetters,
                    gameOver,
                    setGameOver,
                    attempts
                }}
            >
                <div className="wordle-game">
                    <Board />
                    {gameOver.gameOver ? <>Game Over</> : <>Show Keyboard</>}
                    {/* gameOver --> <GameOver /> : <Keyboard /> */}
                </div>
            </WordleContext.Provider>
        </div>
    )
}

export default Wordle;