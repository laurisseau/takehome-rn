import { SafeAreaProvider } from 'react-native-safe-area-context';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Home from './screens/home/Home';
import Login from './screens/auth/Login';
import Register from './screens/auth/Register';
import WebView from './screens/webview/WebView';

export type StackScreens = {
  Home: { sessionToken: string };
  Login: undefined;
  Register: undefined;
  App: undefined;
};

export const Stack = createNativeStackNavigator<StackScreens>();

export default function App() {
  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen
            name="Home"
            component={Home}
            options={{
              title: 'Home',
            }}
          />

          <Stack.Screen
            name="Login"
            component={Login}
            options={{
              title: 'Login',
            }}
          />
          <Stack.Screen
            name="Register"
            component={Register}
            options={{
              title: 'Register',
            }}
          />
          <Stack.Screen
            name="App"
            component={WebView}
            options={{
              title: 'App',
            }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
}
