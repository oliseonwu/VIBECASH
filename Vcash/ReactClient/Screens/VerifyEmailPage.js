


import { Text, View, TextInput, useWindowDimensions, 
    TouchableWithoutFeedback, Keyboard, TouchableOpacity,
    Platform, KeyboardAvoidingView, Image, StyleSheet} from 'react-native';
import { s } from "react-native-wind";
import ResizableContainer from '../assets/components/ResizableContainer';
import normalize  from '../assets/utilities/normalize';

import warningSign from "../assets/img/warning1.png"
import CryptoJS from 'react-native-crypto-js';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {ENCRYPTION_KEY } from "@env"
import { useState, useRef, useEffect, useContext } from 'react';
import { useRoute } from '@react-navigation/native';
import AutoInputFocus from '../assets/components/AutoInputFocus';
import CD_Timer from '../assets/components/countDownTimer';
import { fetchCurrentTime } from '../assets/utilities/CurrentTime';
import CustomInputGroup from '../assets/components/customInput/CustomInputGroup';
import { color } from 'react-native-reanimated';
import {createNewUser,doesEmailExistInDB, 
    logOutCurrentUser, loginUsingSessionToken, verifyCode} from "../assets/utilities/parseFunctions" 
const VerifyEmailPage = ({navigation}) => {
    // email pattern recorgnistion
    const route = useRoute()
    const email = route.params.email;
    const inputRef = useRef(); // reference to the input DOM obj 
    const {height, width} = useWindowDimensions();
    const [noNetworkSign, setNetworkSignStatus] = useState(false)
    const [isKeyboardActive, setIsKeyboardActive] = useState(false);
    const [isCodeRejected, setIsCodeRejected] = useState(false);
    
    const[inputCode, setInputCode] = useState("")
    
    const scale = normalize;
    
    // verify the code
    const onClickNextBTN = async() =>{
        setNetworkSignStatus(false);
        hideKeyboard();

        const verification = await verifyCode(email,inputCode,"email");

            switch(verification.staus){
                case 1: 
                    loginUsingSessionToken(verification.session);
                    setIsCodeRejected(false);
                    break;
                case -1: // invalid Code
                    // console.log("Invalid Code!");
                    setIsCodeRejected(true);
                    break;
                case 0: // expired Code
                    // console.log("Expired Code!");
                    setIsCodeRejected(true);
                    break;
                default: 
                    console.log("Error occured in onClickNextBTN().\n    msg=" + verification.staus);

            }
          
    }

    const login = async ()=>{
        // Remove in Production
        await logOutCurrentUser()
        /////////////////////////

        const emailExist = await doesEmailExistInDB(email);

        // New user
        if(!emailExist){
            // Creates and logs in the new user
            await createNewUser(email);
        }
        else{
           await loginUser(email);
        }
    }

    // const verifyCode = async()=>{
    //     // 1 means code is valid
    //     // -1 means code is invalid
    //     // 0 means code has expired 

    //     // get current time
    //     let currentTimeStamp = await fetchCurrentTime();
    //     let decryptedData = null;
    //     let savedCode = null;
    //     let storedTimestamp = null;
    //     let result = -1; // result is invalid by default

    //     if(currentTimeStamp != null){
    //         // convert date to usable format
    //         currentTimeStamp = new Date(currentTimeStamp);

    //         // save decrypted data
    //         decryptedData = await dycryptData(ENCRYPTION_KEY);

    //         if(decryptedData !== null){
    //             decryptedData = decryptedData.split('~');

    //             // get the saved code and timestamp
    //             savedCode = decryptedData[0]
    //             storedTimestamp = decryptedData[1]

    //             // convert date to usable format
    //             storedTimestamp = new Date(storedTimestamp)

    //             // get difference in times
    //             const timeDifference = 
    //             currentTimeStamp.getTime() - storedTimestamp.getTime();

    //             // if greater than 0 and <= 2mins
    //             if (timeDifference > 0 && timeDifference <= 2 * 60 * 1000) {     
    //                 // code has not expired 

    //                 //Remove - from saved code
    //                 savedCode = savedCode.replace('-', '');
                     
    //                 if(savedCode == inputCode){ // code is valid
    //                     result = 1;
    //                 }
    //             }
    //             else{ // code expired
    //                 result = 0;
    //             }
    //         }
    //     }
    //     else{
    //         // no internet connection
    //         // or something wrong with 
    //         //API
    //     }
    //     return result;
    // }

    const dycryptData = async(ENCRYPTION_KEY)=>{
        // Dycrypt saved data
        let decryptedData = null;

        await AsyncStorage.getItem(ENCRYPTION_KEY)
        .then( async (encryptedData) => {
            
            decryptedData = CryptoJS.AES.decrypt(
                encryptedData, ENCRYPTION_KEY).toString(CryptoJS.enc.Utf8);
                
        })
        .catch((error) => {
            console.log('DECRYPTION FAILED ...', error);
        });

        return decryptedData;
    }

    const clearInput = ()=>{
        setInputCode("");
        setIsCodeRejected(false);
    }
        
    const displayNextBtn = () =>{
        // if there is an entry
        if(inputCode.length === 6){ 
          return  <TouchableOpacity  onPress={()=>onClickNextBTN() }
                            style={[{ width:"43.7%", height: scale(48), 
                                borderRadius: scale(19.43), justifyContent: 'center', alignItems: 'center',
                                backgroundColor:"#008751"}]} >

                                <Text style={[s`text-white text-center`,
                                    {fontFamily: "Inter-Bold", fontSize: scale(17.93)}]}>
                                        {"Next"}
                                </Text>
                        </TouchableOpacity>
        }
        else{
            return <TouchableOpacity  onPress={()=>onClickNextBTN()  }
            style={[{ width:"43.7%", height: scale(48), 
                borderRadius: scale(19.43), justifyContent: 'center', alignItems: 'center',
                backgroundColor:"#008751", opacity: 0.5}]} disabled={true} >

                <Text style={[s`text-white text-center`,
                    {fontFamily: "Inter-Bold", fontSize: scale(17.93)}]}>
                        {"Next"}
                </Text>
        </TouchableOpacity>
        }
    }

    const hideKeyboard = ()=>{
        // hide the keyboard
        Keyboard.dismiss();

        // update state var
        setIsKeyboardActive(false)
    }

    const displayNetworkSign = ()=>{
        if(noNetworkSign){
            return <View style={{marginLeft:scale(33), flexDirection:"row", alignItems:"center", 
              width:"100%", height: scale("17"), marginTop:normalize(22)}}>
            <View style={{ width:scale(20), height: "100%", paddingRight: scale(6)}}>
                <Image source={warningSign} style={{resizeMode:"contain",width: "100%", height: "100%",
            }}/>
            </View>

            <Text style={{fontFamily:"Inter-Light", fontSize:scale(15), color:"#FF0000"}}>No network service detected</Text>
             </View>
        }    
    }

    return (
        <ResizableContainer width={width}>

            {/* AutoInputFocus holds a setKeyboardState which is 
                used to keep track of when the keyboard is on
                or off. it can bbe set to null we we don't want
                to track the keyboard using state var*/}
            <AutoInputFocus pageName={"VerifyEmailPG"} inputRef = {inputRef} setKeyboardState={setIsKeyboardActive}  />
            <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} 
            keyboardVerticalOffset={ Platform.OS === 'ios'? scale(25) : scale(0)} 
            style={{height:"100%"}}>
            <TouchableWithoutFeedback onPress={()=>{hideKeyboard()}}>

                <View style={[s`bg-white relative`, {height:'100%'}]}>
                    <Text style={[{fontFamily:"Inter-Medium", paddingLeft:scale(22), 
                                fontSize:scale(28), paddingTop: scale(37)}]}>
                        {"Verify Your Email"}
                        </Text>
                    
                    <Text style={[{fontFamily:"Inter-Light", paddingLeft:scale(22), 
                                fontSize:scale(18), paddingTop: scale(20),
                                paddingRight:scale(33)}]}>
                        <Text style={{fontFamily:"Inter-Light", color:"#8E969D"}}>
                            {"Enter the six digit code we sent to your email"} </Text> 
                        <Text style={{fontFamily:"Inter-Regular", color:"#989898"}}>{email}</Text>
                    </Text>

                    <View  style={styles.customInputContainer}>
                        <TouchableOpacity activeOpacity={1} onPress={()=>setIsKeyboardActive(true)}>
                            

                                <CustomInputGroup value={""+inputCode} keyboardState={isKeyboardActive}
                                inputRef= {inputRef}  animation={isCodeRejected} clearInput={clearInput}/>
                            
                        </TouchableOpacity>
                    </View>
                    
                    <TouchableOpacity onPress={(e)=> e.stopPropagation} 
                    style={{width:"100%",height: scale(1), opacity:0, pointerEvents:"none"}}>

                        <View style={[ {paddingLeft:scale(33)}]} >
                            <TextInput ref={inputRef} style={[{ fontFamily:
                            "Inter-Light", fontSize:scale(25), height: "100%"}] }
                                    placeholder={'Enter Confirmation Code '}
                                    keyboardType='number-pad'
                                    onChangeText={(value)=> setInputCode(value)}
                                    textContentType="oneTimeCode"
                                    value={inputCode}
                                    onSubmitEditing={hideKeyboard}
                                    maxLength={6}
                                />
                        </View>
                    </TouchableOpacity>

                    
                    <View style={{paddingTop:scale(10), paddingLeft:scale(22) }}>
                        
                        <CD_Timer   count={120} />
                        
                    </View>

                    {displayNetworkSign()}
                    
                    
                    
                    <View style={[s`absolute bottom-10`, {width:"100%"}]}>

                        <View style={[s`flex-row`, {alignContent:"center", justifyContent: "center",
                        paddingBottom: normalize(40)}]}>
                            
                            <Text style={styles.didntRecieveCode}>{"Didn’t receive code?"}</Text>

                            <TouchableOpacity style={{ marginLeft:normalize(12) }} onPress={(e)=>e.stopPropagation}>

                                    <Text style={styles.resendCodeStyle} >
                                        {"Resend"}</Text>
                            </TouchableOpacity>
                            
                        </View>

                    
                        <View style={[s`flex-row`, {width:"100%", justifyContent:"space-evenly"}]}>

                            <TouchableOpacity onPress={()=> navigation.goBack()} 
                                style= {[s`bg-black`, { width:"43.7%", height: scale(48), 
                                    borderRadius: scale(19.43), justifyContent: 'center', alignItems: 'center',
                                    }]} >

                                    <Text style={[s`text-white text-center`,
                                        {fontFamily: "Inter-Bold", fontSize: scale(17.93)}]}>
                                            {"Back"}
                                    </Text>
                            </TouchableOpacity>

                            {displayNextBtn()}
                        </View>
                    </View>
                    
                </View>
            </TouchableWithoutFeedback>
            </KeyboardAvoidingView>
            
        </ResizableContainer>
      
    );
  };

  const styles = StyleSheet.create({
    customInputContainer: {
      marginLeft: normalize(22),
      marginRight: normalize(22),
      paddingTop: normalize(55),
      paddingBottom: normalize(52),
    },
    didntRecieveCode:{
        fontFamily: "Inter-Light",
        fontSize: normalize(18),
        
        color: "#A5A5A5",
        // textAlign:"center"
    },
    resendCodeStyle: {
        fontFamily: "Inter-Bold", 
        fontSize:normalize(18),
        fontFamily:"Inter-Medium",
        color:"#6AC78E",
    }
    
  });
export default VerifyEmailPage;
