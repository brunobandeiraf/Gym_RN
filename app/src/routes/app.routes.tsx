import { useTheme } from 'native-base';
import { createBottomTabNavigator, BottomTabNavigationProp } from '@react-navigation/bottom-tabs';

import HomeSvg from '@assets/home.svg';
import HistorySvg from '@assets/history.svg';
import ProfileSvg from '@assets/profile.svg';

import { Home } from '@screens/Home';
import { Exercise } from '@screens/Exercise';
import { History } from '@screens/History';
import { Profile } from '@screens/Profile';

type AppRoutes = {
    home: undefined;
    exercise: undefined;
    profile: undefined;
    history: undefined;
}
export type AppNavigatorRoutesProps = BottomTabNavigationProp<AppRoutes>;

const { Navigator, Screen } = createBottomTabNavigator<AppRoutes>();

export function AppRoutes() {

    const { sizes } = useTheme();
    const iconSize = sizes[6];

  return (
    <Navigator screenOptions={{  
        headerShown: false, // Remover header superior de todas as telas
        tabBarShowLabel: false //Remover o nome e deixar somente o ícone
    }}>
      <Screen 
        name='home'
        component={Home}
        options={{
            tabBarIcon: ({ color,  }) => (
              <HomeSvg fill={color} width={iconSize} height={iconSize} />
            )
        }}
      />

      <Screen 
        name='history'
        component={History}
        options={{
            tabBarIcon: ({ color }) => (
              <HistorySvg fill={color} width={iconSize} height={iconSize} />
            )
        }}
      />

      <Screen 
        name='profile'
        component={Profile}
        options={{
            tabBarIcon: ({ color }) => (
              <ProfileSvg fill={color} width={iconSize} height={iconSize} />
            )
        }}
      />

      <Screen 
        name='exercise'
        component={Exercise}
      />
    </Navigator>
  );
}