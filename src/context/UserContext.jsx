import { createContext, useState } from 'react';
// 1. Création du contexte
export const UserContext = createContext();
// 2. Création du composant Provider
export const UserProvider = ({ children }) => {
    const [pseudo, setPseudo] = useState(null);//Pseudo par défaut null[span_3]
    const [score, setScore] = useState(0);//Meilleur score initialisé à 0
    return (
        <UserContext.Provider value={{ pseudo,
        setPseudo, score, setScore }}>
            {children}
        </UserContext.Provider>
    );
};