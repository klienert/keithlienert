import React from "react";
import { useWordleContext } from "./wordle-context";


const Error = () => {
    const { wordError, setWordError } = useWordleContext();

    return (
        <div className="error-overlay">
            <div className='error-container'>
                <button onClick={() => setWordError(null)}>X</button>
                <p className="error-word">{wordError}</p>
                <p>is not a valid word.</p>
            </div>
        </div>
    )
}

export default Error;