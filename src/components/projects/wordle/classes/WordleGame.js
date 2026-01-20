import { generateWordSet } from "../words/Words";

class WordleGame {

    /**
     * Constructor for WordleGame class
     * @param {*} correctWord 
     * @param {*} guessWord 
     */
    constructor(correctWord, guessWord) {
        this.correctWord = correctWord.toLowerCase();
        this.guessWord = guessWord.toLowerCase();
        this.wordSet = null;
    }

    async init() {
        const { wordSet } = await generateWordSet();
        this.wordSet = wordSet;
    }

    // check if valid word

    // get correct word

    // get guess word

    


}

export default WordleGame;