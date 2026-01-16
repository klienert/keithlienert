import { describe, it, expect, beforeEach, vi } from 'vitest';
import { render, screen, renderHook, act, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import  WordleProvider  from './wordle-provider';
import { useWordleContext } from './wordle-context';
import * as Words from './words/Words';


// Mock the generateWordSet function
vi.mock('./words/Words', () => ({
    generateWordSet: vi.fn(() => Promise.resolve({
        wordSet: new Set(['hello', 'wrong', 'fails', 'world', 'tests', 'react', 'tight']),
        todaysWord: 'TIGHT'
    }))
}));

const wrapper = ({ children }) => <WordleProvider>{children}</WordleProvider>;

// Test component that uses the context
function TestComponent() {
    const {
        currentGuess,
        currentRow,
        gameStatus,
        board,
        letterState,
        keyStates,
        correctWord,
        handleKeyPress
    } = useWordleContext();

  return (
    <div>
        <div data-testid="current-guess">{currentGuess}</div>
        <div data-testid="current-row">{currentRow}</div>
        <div data-testid="game-status">{gameStatus}</div>
        <div data-testid="correct-word">{correctWord}</div>
        <div data-testid="board">{JSON.stringify(board)}</div>
        <div data-testid="key-states">{JSON.stringify(keyStates)}</div>
        <button onClick={() => handleKeyPress('A')}>Press A</button>
        <button onClick={() => handleKeyPress('ENTER')}>Press Enter</button>
        <button onClick={() => handleKeyPress('BACKSPACE')}>Press Backspace</button>
    </div>
  );
}

describe('WordleProvider', () => {
    beforeEach(() => {
        vi.clearAllMocks();
    });
    
    /* 
    describe('Initial State', () => {
        it('provides initial context values', async () => {
            render(
                <WordleProvider>
                    <TestComponent />
                </WordleProvider>
            );

            // Wait for word loading
            await waitFor(() => {
                expect(screen.getByTestId('correct-word')).toHaveTextContent('TIGHT');
            });

            expect(screen.getByTestId('current-guess')).toHaveTextContent('');
            expect(screen.getByTestId('current-row')).toHaveTextContent('0');
            expect(screen.getByTestId('game-status')).toHaveTextContent('playing');
        });

        it('initializes empty board', () => {
            const { result } = renderHook(() => useWordleContext(), {
                wrapper: WordleProvider,
            });

            expect(result.current.board).toHaveLength(6);
            expect(result.current.board[0]).toEqual(['', '', '', '', '']);
        });

        it('loads word data on mount', async () => {
            const { result } = renderHook(() => useWordleContext(), {
                wrapper: WordleProvider,
            });

            await waitFor(() => {
                expect(result.current.wordSet).toBeDefined();
                expect(result.current.correctWord).toBe('TIGHT');
            });
        });
    });
    */

    /* 
    describe('Key Press Handling', () => {
        it('adds letter to current guess', async () => {
            render(
                <WordleProvider>
                    <TestComponent />
                </WordleProvider>
            );

            await waitFor(() => {
                expect(screen.getByTestId('correct-word')).toHaveTextContent('TIGHT');
            });

            const button = screen.getByText('Press A');
            await userEvent.click(button);

            expect(screen.getByTestId('current-guess')).toHaveTextContent('A');
        });

        it('limits guess to 5 letters', async () => {
            const { result } = renderHook(() => useWordleContext(), {
                wrapper: WordleProvider,
            });

            await waitFor(() => {
                expect(result.current.correctWord).toBe('TIGHT');
            });

            act(() => {
                result.current.handleKeyPress('A');
                result.current.handleKeyPress('B');
                result.current.handleKeyPress('C');
                result.current.handleKeyPress('D');
                result.current.handleKeyPress('E');
                result.current.handleKeyPress('F'); // Should be ignored
            });
            expect(result.current.currentGuess).toBe('ABCDE');
        });

        it('handles backspace correctly', async () => {
            const { result } = renderHook(() => useWordleContext(), {
                wrapper: WordleProvider,
            });

            await waitFor(() => {
                expect(result.current.correctWord).toBe('TIGHT');
            });

            act(() => {
                result.current.handleKeyPress('A');
                result.current.handleKeyPress('B');
                result.current.handleKeyPress('C');
                result.current.handleKeyPress('BACKSPACE');
            });

            expect(result.current.currentGuess).toBe('AB');
        });

        it('converts lowercase keys to uppercase', async () => {
            const { result } = renderHook(() => useWordleContext(), {
                wrapper: WordleProvider,
            });

            await waitFor(() => {
                expect(result.current.correctWord).toBe('TIGHT');
            });

            act(() => {
                result.current.handleKeyPress('a');
                result.current.handleKeyPress('b');
            });

            expect(result.current.currentGuess).toBe('AB');
        });
    });
    */

    /* 
    describe('Guess Submission', () => {
        it('does not submit guess with less than 5 letters', async () => {
            const { result } = renderHook(() => useWordleContext(), {
                wrapper
            });

            await waitFor(() => {
                expect(result.current.correctWord).toBe('TIGHT');
            });

            act(() => {
                result.current.handleKeyPress('H');
                result.current.handleKeyPress('E');
                result.current.handleKeyPress('ENTER');
            });

            // Should still be on row 0
            expect(result.current.currentRow).toBe(0);
            expect(result.current.currentGuess).toBe('HE');
        });

        it('submits valid 5-letter guess', async () => {
            const { result } = renderHook(() => useWordleContext(), {
                wrapper
            });

            
            await waitFor(() => {
                expect(result.current.wordSet).toBeDefined();
            });

            act(() => {
                result.current.handleKeyPress('H');
                result.current.handleKeyPress('E');
                result.current.handleKeyPress('L');
                result.current.handleKeyPress('L');
                result.current.handleKeyPress('O');
            });
            
            expect(result.current.currentGuess).toBe('HELLO');

            act(() => {
                result.current.handleKeyPress('ENTER');
            });
            await waitFor(() => {
                expect(result.current.currentRow).toBe(1);
            });
            
            expect(result.current.currentGuess).toBe('');
            expect(result.current.board[0]).toEqual(['H', 'E', 'L', 'L', 'O']);
        });

        it('updates keyboard states after guess', async () => {
            const { result } = renderHook(() => useWordleContext(), {
                wrapper
            });

            await waitFor(() => {
                expect(result.current.wordSet).toBeDefined();
            });

            act(() => {
                // Guess "HELLO" when answer is "TIGHT"
                result.current.handleKeyPress('H');
                result.current.handleKeyPress('E');
                result.current.handleKeyPress('L');
                result.current.handleKeyPress('L');
                result.current.handleKeyPress('O');               
            });

            // expect(result.current.currentGuess).toBe('HELLO');

            act(() => {
                result.current.handleKeyPress('ENTER');
            });

            await waitFor(() => {
                // All letters should be marked as absent
                expect(result.current.keyStates['H']).toBe('present');
                expect(result.current.keyStates['E']).toBe('absent');
                expect(result.current.keyStates['L']).toBe('absent');
                expect(result.current.keyStates['O']).toBe('absent');
            });
        });
    });
    */

    /*
    describe('Game Win/Loss', () => {
        it('sets game status to won when correct word is guessed', async () => {
            const { result } = renderHook(() => useWordleContext(), {
                wrapper: WordleProvider,
            });

            await waitFor(() => {
                expect(result.current.correctWord).toBe('TIGHT');
            });

            act(() => {
                // Guess the correct word "TIGHT"
                result.current.handleKeyPress('T');
                result.current.handleKeyPress('I');
                result.current.handleKeyPress('G');
                result.current.handleKeyPress('H');
                result.current.handleKeyPress('T');                
            });

            expect(result.current.currentGuess).toBe('TIGHT');

            act(() => {
                result.current.handleKeyPress('ENTER');
            })

            await waitFor(() => {
                expect(result.current.gameStatus).toBe('won');
            });
        });

        it('sets game status to lost after 6 failed attempts', async () => {
            const { result } = renderHook(() => useWordleContext(), {
                wrapper
            });

            await waitFor(() => {
                expect(result.current.wordSet).toBeDefined();
            });

            // Make 6 wrong guesses
            const guesses = ['HELLO', 'WORLD', 'TESTS', 'REACT', 'WRONG', 'FAILS'];

            for (const word of guesses) {
                act(() => {
                    word.split('').forEach(letter => {
                        result.current.handleKeyPress(letter);
                    });
                });

                act(() => {
                    result.current.handleKeyPress('ENTER');
                });
            }

            await waitFor(() => {
                expect(result.current.gameStatus).toBe('lost');
                expect(result.current.currentRow).toBe(5); // Still on last row
            });            
        });
    });
    */
    

    describe('Letter State Evaluation', () => {
        it('marks correct letters green', async () => {
            const { result } = renderHook(() => useWordleContext(), {
                wrapper
            });

            await waitFor(() => {
                expect(result.current.correctWord).toBe('TIGHT');
            });

            act(() => {
                // Guess "TIGER" - T, I, G are correct positions
                result.current.handleKeyPress('T');
                result.current.handleKeyPress('I');
                result.current.handleKeyPress('G');
                result.current.handleKeyPress('E');
                result.current.handleKeyPress('R');
                
            });
            
            expect(result.current.currentGuess).toBe('TIGER');

            act(() => {
                result.current.handleKeyPress('ENTER');
            });
            console.log('currGuess: ', result.current.currentGuess);
                        
            await waitFor(() => {
                expect(result.current.letterState[0][0]).toBe('correct'); // T
                expect(result.current.letterState[0][1]).toBe('correct'); // I
                expect(result.current.letterState[0][2]).toBe('correct'); // G
                expect(result.current.letterState[0][3]).toBe('absent');  // E
                expect(result.current.letterState[0][4]).toBe('present'); // R (T is in word)
            });            
        });
    });


    // describe('Keyboard Events', () => {
    //     it('responds to window keyboard events', async () => {
    //         render(
    //             <WordleProvider>
    //             <TestComponent />
    //             </WordleProvider>
    //         );

    //     await waitFor(() => {
    //         expect(screen.getByTestId('correct-word')).toHaveTextContent('TIGHT');
    //     });

    //     // Simulate keyboard events
    //     await userEvent.keyboard('ABC');

    //     expect(screen.getByTestId('current-guess')).toHaveTextContent('ABC');
    //     });
    // });
});