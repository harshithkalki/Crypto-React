import React, { useContext, useEffect } from 'react'


const Crypto = React.createContext();
const CryptoContext = ({ children }) => {
    const [cur, setcur] = React.useState("INR");
    const [sym, setsym] = React.useState("₹");
    useEffect(() => {
        if (cur === "INR") {
            setsym("₹");
        } else if (cur === "USD") {
            setsym("$")
        }
    }, [cur]);

    return (
        <Crypto.Provider value={{ cur, sym, setcur }}>
            {children}
        </Crypto.Provider>
    )
}

export default CryptoContext;

export const CryptoState = () => {
    return useContext(Crypto);
}