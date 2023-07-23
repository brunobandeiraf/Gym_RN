import { useContext } from 'react';

import { useTheme, Box } from 'native-base';
import { NavigationContainer, DefaultTheme } from "@react-navigation/native";

import { useAuth } from '@hooks/useAuth';

import { AuthRoutes } from "./auth.routes";
import { AppRoutes } from "./app.routes";

export function Routes() {
    const { colors } = useTheme();

    const { user } = useAuth();

    const theme = DefaultTheme; //definindo a cor padrão do thema
    theme.colors.background = colors.gray[700];
  
    return (
        // box para garantir que na transição de uma tela para outra
        // não apareça um fundo branco
        <Box flex={1} bg="gray.700">
            <NavigationContainer theme={theme}>
             {/* <AuthRoutes /> 
                Se estiver logado, envio para AppRoutes, se não, AuthRoutes
             */}
             {user.id ? <AppRoutes /> : <AuthRoutes />}
            </NavigationContainer>
        </Box>
    );
}