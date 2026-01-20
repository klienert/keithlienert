import React from "react";
import { FaBackspace } from "react-icons/fa";
import { useWordleContext } from "./wordle-context";


const Key = ({ keyVal, onClick }) => {
    const { keyStates } = useWordleContext();

    const state = keyStates[keyVal];

    const getClassName = () => {
        let className = 'key';

        if (keyVal === 'ENTER' || keyVal === 'BACK') className += ' key-big';
        else if (state === 'correct') className += ' key-correct';
        else if (state === 'present') className += ' key-present';
        else if (state === 'absent') className += ' key-absent';
        
        return className;
    };

    return (
        <button
            className={getClassName()}
            onClick={onClick}
        >
            {keyVal === 'BACK' ? <FaBackspace /> : keyVal}
        </button>
    )
}

export default Key;