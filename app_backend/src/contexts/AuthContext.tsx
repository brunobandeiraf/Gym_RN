import { createContext, ReactNode, useState} from "react";

import { UserDTO } from "@dtos/UserDTO";

export type AuthContextDataProps = {
    // user irá usar o type UserDTO 
    user: UserDTO;
    singIn: (email: string, password: string) => void;
}

// Tipagem do children
type AuthContextProviderProps = {
    children: ReactNode;
}
  
export const AuthContext = createContext<AuthContextDataProps>({} as AuthContextDataProps);

export function AuthContextProvider({ children }: AuthContextProviderProps)  {
    
    const [user, setUser] = useState({
        id: '1',
        name: 'Bruno Bandeira',
        email: 'bruno@email.com',
        avatar: 'bruno.png'
    })

    function singIn(email: string, password: string) {
        setUser({
          id: '',
          name: '',
          email,
          avatar: '',
        })
    }

    return (
        <AuthContext.Provider value={{ user, singIn }}>
            {children}
        </AuthContext.Provider>
    )
}