import React from "react";
import Board from './Board';
import Keyboard from "./Keyboard";
import '../../../assets/css/pages/projects/wordle.css';
import WordleProvider from './wordle-provider';
import WordleGame from "./WordleGame";

const Wordle = () => {

    return (
        <WordleProvider>
            <WordleGame />
        </WordleProvider>
    )
}

export default Wordle;