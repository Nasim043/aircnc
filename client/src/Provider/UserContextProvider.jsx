import axios from "axios";
import { createContext, useEffect, useState } from "react";

export const UserContext = createContext({})

const UserContextProvider = ({ children }) => {
    const [user, setUser] = useState(null)
    const [ready, setReady] = useState(false)

    useEffect(() => {
        if (!user) {
            axios.get('/profile')
                .then(res => {
                    setUser(res.data);
                    setReady(true);
                })
        }
    }, [user])

    return (
        <UserContext.Provider value={{ user, setUser, ready }} >
            {children}
        </UserContext.Provider>
    );
};

export default UserContextProvider;