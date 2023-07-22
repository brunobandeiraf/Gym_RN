import { createNativeStackNavigator, NativeStackNavigationProp } from '@react-navigation/native-stack';

import { SignIn } from '@screens/SignIn';
import { SignUp } from '@screens/SignUp';

type AuthRoutes = {
    signIn: undefined;
    signUp: undefined;
}
// Propriedades da rotas de navagação
export type AuthNavigatorRoutesProps 
= NativeStackNavigationProp<AuthRoutes>;

const { Navigator, Screen } = createNativeStackNavigator<AuthRoutes>();

export function AuthRoutes() {
  return (
    // headerShown: false - remover cabeçalho superior da rota
    <Navigator screenOptions={{ headerShown: false }}>
      <Screen 
        name="signIn"
        component={SignIn}
      />

      <Screen 
        name="signUp"
        component={SignUp}
      />
    </Navigator>
  )
}