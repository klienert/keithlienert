import { expect, test } from "vitest";
import WordleWord from "./WordleWord";

test('CRANE v. CRANK', () => {
    const word = new WordleWord('CRANE', 'CRANK'); 
    expect(word.getLetterFeedback()).toStrictEqual(
        ['correct', 'correct', 'correct', 'correct', 'absent']
    )
});

test('CRANE v. CLEAN', () => {
    const word = new WordleWord('CRANE', 'CLEAN'); 
    expect(word.getLetterFeedback()).toStrictEqual(
        ['correct', 'absent', 'present', 'present', 'present']
    )
})

test('HOUSE v MOUSE', () => {
    const word = new WordleWord('HOUSE', 'MOUSE');
    expect(word.getLetterFeedback()).toStrictEqual(
        ['absent', 'correct', 'correct', 'correct', 'correct']
    );
})

test('MOUSE v. MOOSE', () => {
    const word = new WordleWord('MOUSE', 'MOOSE');
    expect(word.getLetterFeedback()).toStrictEqual(
        ['correct', 'correct', 'absent', 'correct', 'correct']
    )
})

test('CRANE v PIOUS', () => {
    const word = new WordleWord('crane', 'pious');
    expect(word.getLetterFeedback()).toStrictEqual(
        ['absent', 'absent', 'absent', 'absent', 'absent']
    )
})

test("TREAT v. WHEAT", () => {
    const word = new WordleWord('treat', 'wheat');
    expect(word.getLetterFeedback()).toStrictEqual(
        ['absent', 'absent', 'correct', 'correct', 'correct']
    )
})

test('PLANT v LLAMA', () => {
    const word = new WordleWord('plant', 'llama');
    expect(word.getLetterFeedback()).toStrictEqual(
        ['absent', 'correct', 'correct', 'absent', 'absent']
    )
})

test('SHEEP v PEEPS', () => {
    const word = new WordleWord('SHEEP', 'PEEPS');
    expect(word.getLetterFeedback()).toStrictEqual(
        ['present', 'present', 'correct', 'absent', 'present']
    )
})

test('CRANE v CRAMP', () => {
    const word = new WordleWord('CRANE', 'CRAMP');
    expect(word.getDisabledLetters()).toStrictEqual(['M', 'P'])
})

test('getResults()', () => {
    const word = new WordleWord('Crane', 'crane');
    const result = word.getResults();

    expect(result.feedback).toEqual(['correct', 'correct', 'correct', 'correct', 'correct']);
    expect(result.correctLetters).toEqual(new Set(["C", "R", "A", "N", "E"]));
    expect(result.presentLetters).toEqual(new Set());
    expect(result.disabledLetters).toEqual(new Set());
})

test('getResults() --> THIGH v. TIGHT', () => {
    const word = new WordleWord('THIGH', 'TIGHT');
    const result = word.getResults();

    expect(result.feedback).toEqual(['correct', 'present', 'present', 'present', 'absent']);
    expect(result.correctLetters).toEqual(new Set(["T"]));
    expect(result.presentLetters).toEqual(new Set(["I", "G", "H"]));
    expect(result.disabledLetters).toEqual(new Set(["T"]));
})

test('getResults() --> SLEEP v SHEEP', () => {
    const word = new WordleWord("SLEEP", "SHEEP");
    const result = word.getResults();

    expect(result.feedback).toEqual(['correct', 'absent', 'correct', 'correct', 'correct']);
    expect(result.correctLetters).toEqual(new Set(['E', 'S', 'P']))
    expect(result.presentLetters).toEqual(new Set())
    expect(result.disabledLetters).toEqual(new Set(['H']))
})