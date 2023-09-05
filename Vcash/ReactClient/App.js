import Bugsnag from '@bugsnag/expo';


import 'react-native-gesture-handler';
import { StrictMode, createContext, useRef, useState } from 'react';
// import { StatusBar } from 'expo-status-bar';
import { StyleSheet, SafeAreaView, StatusBar } from 'react-native';
import { s } from "react-native-wind";
import { useFonts } from 'expo-font';
import { createStackNavigator } from '@react-navigation/stack';
import GetStarted from './Screens/GetStarted';
import { NavigationContainer } from '@react-navigation/native';
import EmailPage from './Screens/EmailPage';
import PNPage from './Screens/PNPage';
import VerifyEmailPage from './Screens/VerifyEmailPage';
import {BUG_SNAG } from "@env"
import {getAuth, createUserWithEmailAndPassword,signInWithEmailAndPassword } from 'firebase/auth'

// import { initializeApp } from 'firebase/app';


import { isPageVisitedContex } from './assets/components/visitedPagesListContex';

const Stack = createStackNavigator();

// export const isPageVisitedContex = createContext();
// hold the status of if a page has been visited or not

export default function App() {
// Bugsnag.notify(new Error("yysndk"))

// firebaseAuth.updateCurrentUser // usefull for setting the current signed in user

  const [screenListVisitState, setScreenListVisitState] = useState({"PNpage": false,
 'EmailPage': false, VerifyEmailPG: false});
 // this hold state of if we have visited these screens or not  

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

  if(!Bugsnag.isStarted()){
    Bugsnag.start(BUG_SNAG);
  }

  if(!fontsLoaded){
    return undefined;
  }

  const visitPage = (screenName)=>{
    const tempList = screenListVisitState;

    tempList[screenName] = true;
    setScreenListVisitState(tempList)
  }

  return (
    
    <SafeAreaView style={[s`bg-white`, {width:"100%", height:"100%"}]}>
      <isPageVisitedContex.Provider value={{screenListVisitState, visitPage}}>
  
  {/* Set the back ground color of the status bar
      and the text in the status bar */}
            <StatusBar
                backgroundColor={'white'}
                barStyle={'dark-content'}>
            </StatusBar>
            
              <NavigationContainer>
                <Stack.Navigator >
                
                  <Stack.Screen options={{headerShown:false, animationEnabled: false}} name="Get Started" component={GetStarted} />
                  <Stack.Screen options={{headerShown:false, animationEnabled: false}} name="PNpage" component={PNPage} />
                  <Stack.Screen options={{headerShown:false, animationEnabled: false}} name="EmailPage" component={EmailPage} />
                  <Stack.Screen options={{headerShown:false, animationEnabled: false}} name="VerifyEmailPG" component={VerifyEmailPage} />
        
                </Stack.Navigator>
              </NavigationContainer>
      </isPageVisitedContex.Provider>
    </SafeAreaView>
    
  );
}

// to use custom fonts
// npx expo install expo-font

// React stack view
// npm install @react-navigation/stack
// npx expo install react-native-gesture-handler

// Scaller
// npm i --save react-native-size-matters
