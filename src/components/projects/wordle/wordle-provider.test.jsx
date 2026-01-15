import { describe, it, expect, beforeEach } from 'vitest';
import { render, screen, renderHook, act } from '@testing-library/react';
import { WordleProvider } from './wordle-provider';
import { WordleContext, useWordleContext } from './wordle-context';

// Helper component to test context values
function TestComponent() {

    const context = useWordleContext();
    return (
        <div>
            <div data-testid="current-guess">{context.currentGuess}</div>
            <div data-testid="current-row">{context.currentRow}</div>
            <div data-testid="game-status">{context.gameStatus}</div>
            <button onClick={() => context.handleKeyPress('A')}>Press A</button>
        </div>
    );
}

describe('WordleProvider', () => {
    // it('provides initial context values', () => {
    //     render(
    //     <WordleProvider>
    //         <TestComponent />
    //     </WordleProvider>
    //     );

    //     expect(screen.getByTestId('current-guess')).toHaveTextContent('');
    //     expect(screen.getByTestId('current-row')).toHaveTextContent('0');
    //     expect(screen.getByTestId('game-status')).toHaveTextContent('playing');
    // });

    // it('updates currentGuess when letter key is pressed', () => {
    //     const { getByTestId, getByText } = render(
    //         <WordleProvider>
    //             <TestComponent />
    //         </WordleProvider>
    //     );

    //     const button = getByText('Press A');
    //     act(() => {
    //         button.click();
    //     });

    //     expect(getByTestId('current-guess')).toHaveTextContent('A');
    // });

    it('limits guess to 5 letters', () => {
        const { result } = renderHook(() => useWordleContext(), {
            wrapper: WordleProvider,
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

    // it('handles backspace correctly', () => {
    //     const { result } = renderHook(() => useWordleContext(), {
    //     wrapper: WordleProvider,
    //     });

    //     act(() => {
    //     result.current.handleKeyPress('A');
    //     result.current.handleKeyPress('B');
    //     result.current.handleKeyPress('BACKSPACE');
    //     });

    //     expect(result.current.currentGuess).toBe('A');
    // });

    // it('initializes board with empty strings', () => {
    //     const { result } = renderHook(() => useWordleContext(), {
    //     wrapper: WordleProvider,
    //     });

    //     expect(result.current.board).toHaveLength(5);
    //     expect(result.current.board[0]).toEqual(['', '', '', '', '']);
    // });
});