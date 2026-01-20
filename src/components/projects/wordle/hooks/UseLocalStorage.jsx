import React, { useState, useEffect } from "react";

/**
 * custom Hook, to set key and value to local storage
 * @param {*} key 
 * @param {*} initialValue 
 * @returns 
 */
export function useLocalStorage(key, initialValue) {
    const [value, setValue] = useState(() => {
        try {
            const stored = localStorage.getItem(key);
            return stored ? JSON.parse(stored) : initialValue;

        } catch (error) {
            console.warn(`Error reading localStorage key "${key}"`, error);
            return initialValue;
        }
    });

    useEffect(() => {
        try {
            localStorage.setItem(key, JSON.stringify(value));
        } catch (error) {
            console.warn(`Error writing to localStorage key "${key}"`, error)
        }
    }, [key, value]);

    return [value, setValue];
}
