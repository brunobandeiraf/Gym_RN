import { useContext } from 'react';

import { useTheme, Box } from 'native-base';
import { NavigationContainer, DefaultTheme } from "@react-navigation/native";

import { AuthContext } from '@contexts/AuthContext';

import { AuthRoutes } from "./auth.routes";
import { AppRoutes } from "./app.routes";

export function Routes() {
    const { colors } = useTheme();

    // useContext acessa os contextos da aplicação
    const contextData = useContext(AuthContext);
    console.log("USUÁRIO LOGADO =>", contextData);

    const theme = DefaultTheme; //definindo a cor padrão do thema
    theme.colors.background = colors.gray[700];
  
    return (
        // box para garantir que na transição de uma tela para outra
        // não apareça um fundo branco
        <Box flex={1} bg="gray.700">
            <NavigationContainer theme={theme}>
             {/* <AuthRoutes /> */}
             <AuthRoutes />
            </NavigationContainer>
        </Box>
    );
}