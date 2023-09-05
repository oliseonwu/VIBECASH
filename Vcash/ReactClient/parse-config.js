import Parse from "parse/react-native.js";
import AsyncStorage from '@react-native-async-storage/async-storage';
import {APPLICATION_ID, JAVASCRIPT_KEY } from "@env"

console.log("Parse application Id", Parse.applicationId)
if(!Parse.applicationId){
    //Initializing the SDK. 
    console.log("Parse initialized!")
    Parse.setAsyncStorage(AsyncStorage);
 
    Parse.initialize(APPLICATION_ID,JAVASCRIPT_KEY);
    Parse.serverURL = 'https://parseapi.back4app.com/';
}


export default Parse;
