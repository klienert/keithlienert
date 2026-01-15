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

    // return (
    //     <div className="wordle-container">
    //         <div className="wordle-nav">
    //             <h2 className="wordle-title">Wordle</h2>
    //         </div>
    //         <WordleProvider>
    //             <div className="wordle-game">
    //                 <Board />
    //                 <Keyboard />
    //             </div>
    //         </WordleProvider>
    //     </div>
    // )
}

export default Wordle;