import { useWordleContext } from "./wordle-context";
import Key from "./Key";

const Keyboard = () => {
    const { handleKeyPress, keyStates } = useWordleContext();

    const rows = [
        ["Q","W","E","R","T","Y","U","I","O","P"], 
        ["A","S","D","F","G","H","J","K","L"], 
        ["ENTER", "Z","X","C","V","B","N","M", "BACK"]
    ];

    return (
        <div className="wordle-keyboard">
            {rows.map((row, idx) => (
                <div className="keyboard-row" key={idx}>
                    {row.map(key => (
                        <Key 
                            key={key}
                            keyVal={key}
                            state={keyStates}
                            onClick={() => handleKeyPress(key)}
                        />
                    ))}
                </div>
            ))}
        </div>
    )
}

export default Keyboard;