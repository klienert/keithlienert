import { useLocalStorage } from "./UseLocalStorage";

export const useGameHistory = () => {
    const [ history, setHistory ] = useLocalStorage('k$l$_wordlet', []);

    const addGame = (gameData) => {
        const newGame = {
            id: Date.now(),
            date: new Date().toISOString,
            word: gameData.word,
            guesses: gameData.guesses,
            won: gameData.won,
            attempts: gameData.attempts
        };
        setHistory(prev => [...prev, newGame]);
    }

    const clearHistory = () => {
        setHistory([]);
    };

    const getStats = () => {
        const total = history.length;
        const wins = history.filter(g => g.won).length;
        // const losses = total - wins;
        // const winRate = total > 0 ? (wins / total * 100).toFixed(1) : 0;

        // game distribution
        // const distribution = history.reduce((acc, game) => {
        //     if (game.won) {
        //         const guessCount = game.attempts;
        //         acc[guessCount] = (acc[guessCount] || 0) + 1;
        //     }
        //     return acc;
        // }, {1: 0, 2: 0, 3: 0, 4: 0, 5: 0, 6: 0});

        const guesses = history.reduce((acc, game) => {
            if (game.won) {
                const guessCount = game.attempts;
                acc[guessCount] = (acc[guessCount] || 0) + 1;
            } else {
                acc.fail = (acc.fail || 0) + 1;
            }
            return acc;
        }, {1: 0, 2: 0, 3: 0, 4: 0, 5: 0, 6: 0});

        // average guesses
        const totalGuesses = history
            .filter(g => g.won)
            .reduce((sum, game) => sum + game.attempts, 0);

        const averageGuesses = wins > 0 ? Math.round(totalGuesses / wins) : 0;

        // streaks
        let currentStreak = 0;
        let maxStreak = 0;
        let tempStreak = 0;

        const sortedHistory = [...history].sort((a, b) => a.id - b.id);

        for (let i = 0; i < sortedHistory.length; i++) {
            if (sortedHistory[i].won) {
                tempStreak++;
                maxStreak = Math.max(maxStreak, tempStreak);
            } else {
                tempStreak = 0;
            }
        }

        if (sortedHistory.length > 0 && sortedHistory[sortedHistory.length - 1].won) {
            currentStreak = tempStreak;;
        };

        const winPercentage = total > 0 ? Math.round((wins / total) * 100) : 0;
        const isOnStreak = currentStreak > 0;
        const hasPlayed = total > 0;

        return {
            currentStreak,
            maxStreak,
            guesses,
            winPercentage,
            gamesPlayed: total,
            gamesWon: wins,
            averageGuesses,
            isOnStreak,
            hasPlayed
        };
    };

    

    return {
        history,
        addGame,
        clearHistory,
        stats: getStats()
    };
}

// From NY Times:
// const stats = {
//     currentStreak: 0,
//     maxStreak: 4,
//     guesses: {
//         1: 0,
//         2: 0,
//         3: 2,
//         4: 11,
//         5: 11,
//         6: 6,
//         fail: 1
//     },
//     winPercentage: 97,
//     gamesPlayed: 31,
//     gamesWon: 30,
//     averageGuesses: 5,
//     isOnStreak: false,
//     hasPlayed: true
// }
// also added timestamp