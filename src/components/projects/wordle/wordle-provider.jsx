import React, { useState, useEffect, useCallback } from "react";
import { WordleContext } from "./wordle-context";
import { generateWordSet } from "./words/Words";

const WordleProvider = ( { children }) => {

    // game state
    const [board, setBoard] = useState([
        ["", "", "", "", ""], 
        ["", "", "", "", ""], 
        ["", "", "", "", ""], 
        ["", "", "", "", ""], 
        ["", "", "", "", ""], 
        ["", "", "", "", ""]
    ]);    
    const [currentRow, setCurrentRow] = useState(0);
    const [currentGuess, setCurrentGuess] = useState('');
    const [gameStatus, setGameStatus] = useState('playing'); // 'playing', 'won', 'lost'
    const [letterState, setLetterState] = useState([
        [null, null, null, null, null],
        [null, null, null, null, null],
        [null, null, null, null, null],
        [null, null, null, null, null],
        [null, null, null, null, null]
    ]);
    const [keyStates, setKeyStates] = useState({});
        
    // word data
    const [wordSet, setWordSet] = useState(null);
    const [correctWord, setCorrectWord] = useState('');

    // load words on initial mount
    useEffect(() => {
        const loadWords = async () => {
            const { wordSet: ws, todaysWord: tw } = await generateWordSet();
            setWordSet(ws);            
            // setCorrectWord(tw.toUpperCase());
            setCorrectWord('TIGHT');
        }
        loadWords();
    },[]);

    /* 
        Submission helper fns
    */
    // Evaluate the guess
    const evaluateGuess = (currentGuess, currentRow) => {            
        const correct = correctWord.split('');
        const guess = currentGuess.split('');
        const newLetterState = [...letterState];
        const newRow = Array(5).fill(null);
        const used = Array(correct.length).fill(false);

        // 1st pass
        for (let i = 0; i < guess.length; i++) {
            if (guess[i] === correct[i]) {
                newRow[i] = 'correct';
                used[i] = true;
            }
        }

        // 2nd pass
        for (let i = 0; i < guess.length; i++ ) {
            if (newRow[i] === 'correct') continue;
            let found = false;                
            for (let j = 0; j < correct.length; j++ ) {
                if (!used[j] && guess[i] === correct[j]) {
                    newRow[i] = 'present';
                    used[j] = true;
                    found = true;
                    break;                     
                }
            }
            if (!found) {
                newRow[i] = 'absent';
            }
        }
        newLetterState[currentRow] = newRow;
        setLetterState(newLetterState);
        return newRow;
    }

    const updateKeyboardStates = (guess, rowStates ) => {
        const newKeyState = { ...keyStates };
        let guessArr = guess.split('');
        // console.log('guessArr: ', guessArr);
        // console.log('rowStates: ', rowStates);
        
        
        guessArr.forEach((letter, i) => {
            const state = rowStates[i];
            
            if (state === 'correct') {
                newKeyState[letter] = 'correct';
            } else if (state === 'present' && newKeyState[letter] !== 'correct') {
                newKeyState[letter] = 'present';
            } else if (state === 'absent' && !newKeyState[letter]) {
                newKeyState[letter] = 'absent'
            }            
        });
        
        setKeyStates(newKeyState);
    }

    const submitGuess = () => {        
        // Validate word exists in wordSet
        if (!wordSet.has(currentGuess.toLowerCase())) {
            // Show error - invalid word
            alert('Word is not a wordle word.');
            return;
        }
        
        // Update the board with the current guess
        const newBoard = [...board];
        newBoard[currentRow] = currentGuess.split(''); // Convert string to array here
        setBoard(newBoard);
                
        const rowStates = evaluateGuess(currentGuess, currentRow);
        updateKeyboardStates(currentGuess, rowStates);

        // Check win condition
        if (currentGuess === correctWord) {
            setGameStatus('won');            
            return;
        }
        
        // Check loss condition
        if (currentRow === 5) {
            setGameStatus('lost');            
            return;
        }
        
        // Move to next row and reset guess
        setCurrentRow(prev => prev + 1);
        setCurrentGuess('');
    };

    const handleKeyPress = useCallback((key) => {
        if (gameStatus !== 'playing') return;

        key = key.toUpperCase();

        if (key === 'ENTER') {
            if (currentGuess.length === 5) {
                submitGuess();
            }
        } else if (key === 'BACKSPACE' || key === 'BACK') {
            setCurrentGuess(prev => prev.slice(0, -1));
        } else if (/^[A-Z]$/.test(key)) {
            setCurrentGuess(prev => {
                if (prev.length < 5) {
                    return prev + key;
                }
                return prev;  // Don't add if already 5 letters
            });
        }
    },[currentGuess, gameStatus]);     

    useEffect(() => {
        const handleKeyDown = (e) => {
            handleKeyPress(e.key);
        };
        window.addEventListener('keydown', handleKeyDown);        
        return () => {
            window.removeEventListener("keydown", handleKeyDown);
        };
    }, [handleKeyPress]);    

    const resetGame = () => {
           // game state
        setBoard([
            ["", "", "", "", ""], 
            ["", "", "", "", ""], 
            ["", "", "", "", ""], 
            ["", "", "", "", ""], 
            ["", "", "", "", ""], 
            ["", "", "", "", ""]
        ]);
        setCurrentRow(0);
        setCurrentGuess('');
        setGameStatus('playing'); // 'playing', 'won', 'lost'
        setLetterState([
            [null, null, null, null, null],
            [null, null, null, null, null],
            [null, null, null, null, null],
            [null, null, null, null, null],
            [null, null, null, null, null]
        ]);
        setKeyStates({});
        // generate new word
        const loadWords = async () => {
            const { wordSet: ws, todaysWord: tw } = await generateWordSet();
            setWordSet(ws);            
            setCorrectWord(tw);            
        }
        loadWords();
    };

    
    const value = {
        board,        
        currentGuess, 
        currentRow,
        gameStatus,        
        letterState,
        keyStates,
        wordSet,
        setCorrectWord,
        correctWord,
        handleKeyPress,
        resetGame
    }

    return (
        <WordleContext.Provider value={value}>
            {children}
        </WordleContext.Provider>
    )
}

export default WordleProvider;