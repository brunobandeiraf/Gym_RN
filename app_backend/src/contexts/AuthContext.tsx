import { createContext, ReactNode, useEffect, useState } from "react";

import { storageUserGet, storageUserSave } from '@storage/storageUser';

import { api } from '@services/api';
import { UserDTO } from "@dtos/UserDTO";

export type AuthContextDataProps = {
    // user irá usar o type UserDTO 
    user: UserDTO;
    singIn: (email: string, password: string) => Promise<void>;
}

// Tipagem do children
type AuthContextProviderProps = {
    children: ReactNode;
}
  
export const AuthContext = createContext<AuthContextDataProps>({} as AuthContextDataProps);

export function AuthContextProvider({ children }: AuthContextProviderProps)  {
    
    const [user, setUser] = useState<UserDTO>({} as UserDTO)

    // Responsável por atualizar o useState que atualiza o contexto
    // contexto é a inform para saber os dados do usuário logado
    async function singIn(email: string, password: string) {
        try {
            const { data } = await api.post('/sessions', { email, password });

            if(data.user) {
                setUser(data.user);
                // Armazenando no storage do usuário
                storageUserSave(data.user)
            }
        } catch (error) {
            throw error
        }
    }

    // Recupera o usuário logado e atualiza
    async function loadUserData() {
        const userLogged = await storageUserGet();
    
        if(userLogged) {
          setUser(userLogged)
        }
    }
    
    useEffect(() => {
        loadUserData()
    },[])

    return (
        <AuthContext.Provider value={{ user, singIn }}>
            {children}
        </AuthContext.Provider>
    )
}