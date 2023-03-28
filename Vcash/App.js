import 'react-native-gesture-handler';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { useFonts } from 'expo-font';
import { createStackNavigator } from '@react-navigation/stack';
import GetStarted from './Screens/GetStarted';
import { NavigationContainer } from '@react-navigation/native';
import PNPage from './Screens/PNPage';

const Stack = createStackNavigator();

export default function App() {

  const [fontsLoaded] = useFonts({
    'Inter-ExtraBold': require('./assets/fonts/Inter-ExtraBold.ttf'),
    'Inter-Bold': require('./assets/fonts/Inter-Bold.ttf'),
    'Inter-Light': require('./assets/fonts/Inter-Light.ttf'),
    'Inter-ExtraLight': require('./assets/fonts/Inter-ExtraLight.ttf'),
    'Inter-Black': require('./assets/fonts/Inter-Black.ttf'),
    'Inter-Regular': require('./assets/fonts/Inter-Regular.ttf'),
    'Inter-Medium': require('./assets/fonts/Inter-Medium.ttf'),
  });

  if(!fontsLoaded){
    return undefined;
  }

  return (
    <NavigationContainer>
      <Stack.Navigator>
      <Stack.Screen options={{headerShown:false}} name="Get Started" component={GetStarted} />
      <Stack.Screen options={{headerShown:false}} name="PNpage" component={PNPage} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

// to use custom fonts
// npx expo install expo-font

// React stack view
// npm install @react-navigation/stack
// npx expo install react-native-gesture-handler
