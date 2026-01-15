import React from "react";
import Letter from "./Letter";
import { useWordleContext } from "./wordle-context";

const Board = () => {
    const { board } = useWordleContext();
        
    return (
        <div className="wordle-board">
            {board.map((row, rowIndex) => (
                <div className="wordle-board-row" key={rowIndex}>
                    {row.map((letter, letterIndex) => (
                        <Letter 
                            key={letterIndex}
                            letter={letter}
                            rowIndex={rowIndex}
                            letterIndex={letterIndex}
                        />
                    ))}
            </div>
            ))}
        </div>
    );
}

export default Board;