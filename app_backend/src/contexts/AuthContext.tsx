import { createContext, ReactNode, useState} from "react";

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
            }
        } catch (error) {
            throw error
        }
    }

    return (
        <AuthContext.Provider value={{ user, singIn }}>
            {children}
        </AuthContext.Provider>
    )
}