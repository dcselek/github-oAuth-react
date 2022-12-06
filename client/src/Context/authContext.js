import React from 'react'

const AuthContext = React.createContext()

export default function AuthProvider({children}) {
    const [token, setToken] = React.useState(localStorage.getItem("token"));
    
    return (
        <AuthContext.Provider value={{token, setToken}}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    return React.useContext(AuthContext);
}