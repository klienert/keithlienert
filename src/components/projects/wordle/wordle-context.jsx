import { createContext, useContext } from "react";

export const WordleContext = createContext(); 

export const useWordleContext = () => {
    const context = useContext(WordleContext);

    if (!context) {
        throw new Error('useWordleContext must be used within a WordleContext.Provider');        
    }
    return context;
}
