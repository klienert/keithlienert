import React, { useContext, useEffect } from "react";
import { WordleContext } from "./index";

const Letter = ( { letterPos, attemptVal } ) => {

    const {
        board,
        correctWord,
        currAttempt,
        disabledLetters,
        presentLetters,
        correctLetters,
        setCorrectLetters,
        attempts
    } = useContext(WordleContext);

    const letter = board[attemptVal][letterPos];
    const correct = correctWord.toUpperCase()[letterPos] === letter;
    // const almost = !correct && letter !== "" && correctWord.toUpperCase().includes(letter);    

    const setLetterClass = () => {
        let result = 'wordle-letter';
        // if (currAttempt.attempt > attemptVal) {
        //     if (correct) {
        //         result += 'correct';
        //     } else if (almost) {
        //         result += 'present';
        //     } else {
        //         result += 'absent';
        //     }
        // }
        return result;
    }

    let letterClass = setLetterClass();

    // useEffect(() => {
    //     if (letter !== "" && !almost && correct) {
    //         setCorrectLetters((prev) => [...prev, letter]);
    //     }
    // },[almost, correct, currAttempt.attempt, letter, setCorrectLetters]);

    return (
        <div className={letterClass}>
            {letter}
        </div>
    )
}
export default Letter;