class WordleWord {

    /**
     * Constructor for the WorldWord class
     * @param {*} correctWord - from randomized word generator 
     * @param {*} guessWord - the guessed word
     */
    constructor(correctWord, guessWord) {
        this.correctWord = correctWord.toLowerCase();
        this.guessWord = guessWord.toLowerCase();        
    }

    // getters & setters
    getCorrectWord() {
        return this.correctWord.toUpperCase();
    }

    getCorrectArray() {
        let arr = this.correctWord.toUpperCase().split('');
        return arr;
    }

    getGuessWord() {
        return this.guessWord.toUpperCase();
    }

    getGuessArray() {
        let arr = this.guessWord.toUpperCase().split('');
        return arr;
    }
    
    /**
     * Loops through the guess word twice: 1) to determine which letter is correct. 2) to determine if a letter is used and/or present in the guess word
     * @returns - an array the same length as the guess word with feedback for each letter
     */
    getLetterFeedback() {
        const correct = this.getCorrectArray();
        const guess = this.getGuessArray();
        const feedback = Array(guess.length).fill('absent');
        const used = Array(correct.length).fill(false);

        // first pass:
        for (let i = 0; i < guess.length; i++ ) {
            if (guess[i] === correct[i]) {
                feedback[i] = 'correct';
                used[i] = 'correct';
            }
        }

        // second pass:
        for (let i = 0; i < guess.length; i++) {
            if (feedback[i] === 'correct') continue;
            for (let j = 0; j < correct.length; j++ ) {
                if (!used[j] && guess[i] === correct[j]) {
                    feedback[i] = 'present';
                    used[j] = true;
                    break;
                }
            }
        }
        return feedback;
    }
            
    /**
     * Takes the correct word and guessed word, determines any letter guessed that is NOT correct and puts them in the disbled letters set
     * @returns - an array of disabled letters (for visual keyboard). No duplicates
     */
    getDisabledLetters() {
        const correct = this.getCorrectArray();
        const guess = this.getGuessArray();
        const correctSet = new Set(correct);
        const result = new Set();

        for (let letter of guess) {
            if (!correctSet.has(letter)) {
                result.add(letter);
            }
        }
        return Array.from(result);
    }

    // getResults()
    // get feedback...
    // get guessArr...
    // use a set for disabled letters; arrays for present letters and correct letters
    // loop through each feedback result, place in appropriate set/array

    /**
     * Loops through the feedback for each letter and places them in the appropriate arrays
     * **disabledLetters is a set (no duplicates); however, the others may have duplicates
     * @returns an object of arrays {feedback, guessArr, disabledLetters, presentLetters, correctLetters }
     */
    getResults() {
        const feedback = this.getLetterFeedback();
        const guessArr = this.getGuessArray();

        const disabledLetters = new Set();
        const presentLetters = [];
        const correctLetters = [];        

        feedback.forEach((result, i) => {
            const letter = guessArr[i];
            if (result === 'correct') { 
                correctLetters.push(letter);
            } else if (result === 'present') {
                presentLetters.push(letter);
            } else {
                disabledLetters.add(letter);
            }
        });

        return {
            feedback: feedback,
            guessArr: guessArr,
            disabledLetters: Array.from(disabledLetters),
            presentLetters: presentLetters,
            correctLetters: correctLetters
        }
    }    
}

export default WordleWord;