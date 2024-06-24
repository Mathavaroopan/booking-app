import axios from "axios";
import { createContext, useEffect, useState } from "react";

export const UserContext = createContext(null);

export const UserContextProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [ready, setReady] = useState(false);
    useEffect(() => {
        if (!user) {
            axios.get('/profile', { withCredentials: true }).then(({ data }) => {
                console.log("Token data:", data);
                setUser(data);
                setReady(true);
            }).catch(err => {
                console.error("Error fetching profile:", err);
            });
        }
    }, []);

    return (
        <UserContext.Provider value={{ user, setUser }}>
            {children}
        </UserContext.Provider>
    );
};
