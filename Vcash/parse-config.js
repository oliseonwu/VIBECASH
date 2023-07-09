import Parse from "parse/react-native.js";
import AsyncStorage from '@react-native-async-storage/async-storage';
import {APPLICATION_ID, JAVASCRIPT_KEY } from "@env"

//Initializing the SDK. 
Parse.setAsyncStorage(AsyncStorage);
//You need to copy BOTH the the Application ID and the Javascript Key from: Dashboard->App Settings->Security & Keys 
Parse.initialize(APPLICATION_ID,JAVASCRIPT_KEY);
Parse.serverURL = 'https://parseapi.back4app.com/';

export default Parse;
