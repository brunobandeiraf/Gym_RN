import { createContext, ReactNode, useEffect, useState } from "react";

import { storageAuthTokenSave, storageAuthTokenGet } from '@storage/storageAuthToken';
import { storageUserGet, storageUserRemove, storageUserSave } from '@storage/storageUser';

import { api } from '@services/api';
import { UserDTO } from "@dtos/UserDTO";


export type AuthContextDataProps = {
    // user irá usar o type UserDTO 
    // compartilha a autenticação e logout
    user: UserDTO;
    singIn: (email: string, password: string) => Promise<void>;
    signOut: () => Promise<void>;
    isLoadingUserStorageData: boolean;
}

// Tipagem do children
type AuthContextProviderProps = {
    children: ReactNode;
}
  
export const AuthContext = createContext<AuthContextDataProps>({} as AuthContextDataProps);

export function AuthContextProvider({ children }: AuthContextProviderProps)  {
    
    const [user, setUser] = useState<UserDTO>({} as UserDTO)
    const [isLoadingUserStorageData, setIsLoadingUserStorageData] = useState(true); 
    //isLoadingUserStorageData estado para aguardar o carregamento dos dados do usuário, enquanto verifica se está logado no primeiro acesso

    // Armazena o usuário no storage e o token
    async function userAndTokenUpdate(userData: UserDTO, token: string) {
        api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    
        setUser(userData);
    }        
    
    async function storageUserAndTokenSave(userData: UserDTO, token: string) {
        try {
            setIsLoadingUserStorageData(true)

            await storageUserSave(userData); // salva no storage
            await storageAuthTokenSave(token); // salva o token

        } catch (error) {
            throw error
        } finally {
            setIsLoadingUserStorageData(false);
        }
    }
    
    // Responsável por atualizar o useState que atualiza o contexto
    // contexto é a inform para saber os dados do usuário logado
    async function singIn(email: string, password: string) {
        try {
            const { data } = await api.post('/sessions', { email, password });

            if(data.user && data.token) {
                await storageUserAndTokenSave(data.user, data.token);
                userAndTokenUpdate(data.user, data.token)
            }
        } catch (error) {
            throw error
        } finally {
            setIsLoadingUserStorageData(false);
        }
    }

    // Função para sair da aplicação
    async function signOut() {
        try {
            setIsLoadingUserStorageData(true); // ativa o looding de carregamento
            setUser({} as UserDTO); // useState useUser como vazio
            await storageUserRemove(); // Remover o usuário do storage
        } catch (error) {
            throw error;
        } finally {
            setIsLoadingUserStorageData(false); // Finalizar carregamento
        }
    }

    // Recupera o usuário logado e atualiza
    async function loadUserData() {
        try {
            setIsLoadingUserStorageData(true);

            const userLogged = await storageUserGet();
            const token = await storageAuthTokenGet();

            // Se o token existe e usuário logado
            if(token && userLogged) {
                userAndTokenUpdate(userLogged, token);
            }  
        } catch (error) {
            throw error
        } finally {
            setIsLoadingUserStorageData(false);
        }
    }
    
    useEffect(() => {
        loadUserData()
    },[])

    return (
        <AuthContext.Provider value={{ 
            user, 
            singIn,
            signOut,
            isLoadingUserStorageData
          }}>
            {children}
        </AuthContext.Provider>
    )
}