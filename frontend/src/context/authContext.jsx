import React, { createContext, useContext, useState } from "react";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(() => {
        const storedUser = localStorage.getItem("scuser");
        return storedUser ? JSON.parse(storedUser) : null;
    }); 

    const login = (userData, token) => {
        setUser(userData);
        localStorage.setItem("scuser", JSON.stringify(userData));
        localStorage.setItem("sctoken", token);
    }

    const register = (userData, token) => {
        setUser(userData);
        localStorage.setItem("scuser", JSON.stringify(userData));
        localStorage.setItem("sctoken", token);
    }

    const logout = () => {
        setUser(null);
        localStorage.removeItem("scuser");
        localStorage.removeItem("sctoken");
    }

    return (
        <AuthContext.Provider value={{
            user,
            login,
            register,
            logout,
        }}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuth = () => useContext(AuthContext);
export default AuthProvider;