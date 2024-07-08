import React, { useState, createContext } from "react";

const MyContext = createContext();

const MyProvider = ({ children }) => {
    const [id, setId] = useState('');

    return (
        <MyContext.Provider value={{ id, setId }}>
            {children}
        </MyContext.Provider>
    );
};

const MyContextMessage = createContext();

const MyMessageProvider = ({ children }) => {
    const [message, setNewMessage] = useState(null);

    return (
        <MyContextMessage.Provider value={{ message, setNewMessage }}>
            {children}
        </MyContextMessage.Provider>
    );
};

// Corrected exports with the correct component names
export { MyContextMessage, MyMessageProvider };
export { MyContext, MyProvider };
