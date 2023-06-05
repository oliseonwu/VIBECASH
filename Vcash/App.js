import 'react-native-gesture-handler';
import { StrictMode } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, SafeAreaView } from 'react-native';
import { s } from "react-native-wind";
import { useFonts } from 'expo-font';
import { createStackNavigator } from '@react-navigation/stack';
import GetStarted from './Screens/GetStarted';
import { NavigationContainer } from '@react-navigation/native';
import EmailPage from './Screens/EmailPage';
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
    'Inter-SemiBold': require('./assets/fonts/Inter-SemiBold.ttf'),
    'Inter-Thin': require('./assets/fonts/Inter-Thin.ttf'),
  });

  if(!fontsLoaded){
    return undefined;
  }

  return (
    <SafeAreaView style={[s`bg-white`, {width:"100%", height:"100%"}]}>

            <StatusBar
                barStyle={"dark-content"}>
            </StatusBar>
    
            <NavigationContainer>
              <Stack.Navigator>
              <Stack.Screen options={{headerShown:false}} name="Get Started" component={GetStarted} />
              <Stack.Screen options={{headerShown:false}} name="PNpage" component={PNPage} />
              </Stack.Navigator>
            </NavigationContainer>
    </SafeAreaView>
    
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

// Scaller
// npm i --save react-native-size-matters
