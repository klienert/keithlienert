import React from "react";
import { useWordleContext } from "./wordle-context";

const Letter = ( { rowIndex, letterIndex }) => {

    const { board, letterState, currentRow, currentGuess } = useWordleContext();

    let letter = '';
    if (rowIndex < currentRow) {
        letter = board[rowIndex][letterIndex];
    } else if (rowIndex === currentRow) {
        letter = currentGuess[letterIndex] || '';
    }

    const state = letterState[rowIndex]?.[letterIndex];
    
    const getClassName = () => {
        let className = 'wordle-letter';
        if (state === 'correct') className += ' letter-correct';
        else if (state === 'present') className += ' letter-present';
        else if (state === 'absent') className += ' letter-absent';
        else if (letter && rowIndex === currentRow) className += ' letter-filled';
        return className;
    }

    return (
        <div className={getClassName()}>{letter}</div>
    )
}
export default Letter;