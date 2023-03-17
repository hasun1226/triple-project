import { createContext, useContext, useState, useRef } from "react";

export const ThemeContext = createContext([]);

export function useTheme() {
    return useContext(ThemeContext);
}

export function ThemeContextProvider({children}) {
    const [returned, setReturned] = useState(false);
    const data = useRef([]);
    const param = useRef("");
    const error = useRef(null);

    const value = {
        data,
        returned,
        setReturned,
        param,
        error
    };

    return (
        <ThemeContext.Provider value={value}>
            {children}
        </ThemeContext.Provider>
    );
}