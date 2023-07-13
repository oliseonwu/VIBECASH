


import { Text, View, TextInput, useWindowDimensions, 
    TouchableWithoutFeedback, Keyboard, TouchableOpacity,
    Platform, KeyboardAvoidingView, Image, StyleSheet} from 'react-native';
import { s } from "react-native-wind";
import ResizableContainer from '../assets/components/ResizableContainer';
import normalize  from '../assets/utilities/normalize';
import 'react-native-get-random-values'
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
import * as Haptics from 'expo-haptics';


const VerifyEmailPage = ({navigation}) => {
    // email pattern recorgnistion
    const route = useRoute()
    const email = route.params.email;
    const inputRef = useRef(); // reference to the input DOM obj 
    const {height, width} = useWindowDimensions();
    const [noNetworkSign, setNetworkSignStatus] = useState(false)
    const [isCustomInputActive, setCustomInputActiveState] = useState(false);
    const [customInputAnimation, setCustomInputAnimation] = useState(null);
    
    const[inputCode, setInputCode] = useState("")
    
    const scale = normalize;
    
    const VerifyCode = async() =>{
        setNetworkSignStatus(false);
        let currentTimeStamp = await fetchCurrentTime();
        console.log(currentTimeStamp)
        if(currentTimeStamp != null){
            currentTimeStamp = new Date(currentTimeStamp);

            hideKeyboardAndDeactivateCustomInput();

            // Dycrypt saved data
            AsyncStorage.getItem(ENCRYPTION_KEY)
            .then((encryptedData) => {
                
                const decryptedData = CryptoJS.AES.decrypt(
                    encryptedData, ENCRYPTION_KEY).toString(CryptoJS.enc.Utf8);
                
                // get the saved code and timestamp 
                let [savedCode, storedTimestamp] = decryptedData.split('~');
                storedTimestamp = new Date(storedTimestamp)

                // get difference in times
                const timeDifference = currentTimeStamp.getTime() - storedTimestamp.getTime();

                // if greater than 0 and <= 2mins
                if (timeDifference > 0 && timeDifference <= 2 * 60 * 1000) {
                    // code has not expired
                    
                    // Use the decrypted data
                    if(savedCode == inputCode){
                        console.log("Email validated");
                    }
                    else{
                    console.log("Invalid Code!");
                    inputDeniedAnimation();
                    addWarningVibration()
                    }
                }
                else{ // code expired
                    console.log("code has expired!")
                    inputDeniedAnimation();
                    addWarningVibration
                }

            
            })
            .catch((error) => {
                console.log('DECRYPTION FAILED ...', error);
            });
        }
        else{
            
        }
        
    }

    const inputDeniedAnimation = ()=>{

        // make my custom input shake
        setCustomInputAnimation("shake");

        
        setTimeout(()=>{
            // after 500 milisec reset the 
            // animation from "shake" to 
            // null
            setCustomInputAnimation(null)        
        }, 500)
        
        // reset the input code
        setInputCode("")  
    }

    const addWarningVibration = ()=>{
        Haptics.notificationAsync(
            Haptics.NotificationFeedbackType.Error
          )
    }

        
    const handelInput = (code) =>{
        
        // we just added a character
        //HELPS ADD - AFTER 3 CHARACTERS
        // if(code.length > inputCode.length){
            
        //     if(code.length === 3){
        //         code+="-";
        //         setInputCode((inputCode)=> inputCode+"-")
        //     }
        // }
        // else{
        //     // we removed a character
        //     if(code.length === 3){
        //         // code = code.substring(0, 2)    
        //         setInputCode((inputCode)=> inputCode.substring(0,2));
        //     }
        // }       
        setInputCode(code);
    }

    // const displayResendButton=()=>{
    //     if(displayResendCode){
            
    //         return <TouchableOpacity style={{ 
    //             marginLeft:normalize(20), justifyContent:"center", 
    //             alignContent:"center", paddingTop:"0.3%" }}>
    //                 <Text style={{fontFamily: "Inter-Bold", 
    //                 fontSize:normalize(16)}} >
    //                     {"Resend Code?"}</Text></TouchableOpacity>
    //     }
        
    // }

    
    const displayNextBtn = () =>{
        // if there is an entry
        if(inputCode != ""){ 
          return  <TouchableOpacity  onPress={()=>VerifyCode() }
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
            return <TouchableOpacity  onPress={()=>VerifyCode()  }
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

    const hideKeyboardAndDeactivateCustomInput = ()=>{
        // hide the keyboard
        Keyboard.dismiss();

        // send a signal to the custom 
        // input component to deactive
        setCustomInputActiveState(false)
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

            {/* AutoInputFocus holds a set state "customInputSetState" that controls 
                set the active state for the custom input field*/}
            <AutoInputFocus pageName={"VerifyEmailPG"} inputRef = {inputRef} customInputSetState={setCustomInputActiveState}  />
            <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} 
            keyboardVerticalOffset={ Platform.OS === 'ios'? scale(25) : scale(0)} 
            style={{height:"100%"}}>
            <TouchableWithoutFeedback onPress={()=>{hideKeyboardAndDeactivateCustomInput()}}>

                <View style={[s`bg-white relative`, {height:'100%'}]}>
                    <Text style={[{fontFamily:"Inter-Medium", paddingLeft:scale(22), 
                                fontSize:scale(28), paddingTop: scale(37)}]}>
                        {"Verify Your Email"}
                        </Text>
                    
                    <Text style={[{fontFamily:"Inter-Light", paddingLeft:scale(22), 
                                fontSize:scale(18), paddingTop: scale(20),
                                paddingRight:scale(33)}]}>
                        <Text style={{fontFamily:"Inter-Light", color:"#8E969D"}}>{"Enter the six digit code we sent to your email"} </Text> 
                        <Text style={{fontFamily:"Inter-Regular", color:"#989898"}}>{email}</Text>
                    </Text>

                    <TouchableOpacity activeOpacity={1} onPress={()=>setCustomInputActiveState(true)}>
                        <View  style={styles.customInputContainer}>

                            <CustomInputGroup value={""+inputCode}  setActive={isCustomInputActive}
                             inputRef = {inputRef} animation={customInputAnimation}/>
                        </View>
                    </TouchableOpacity>
                    
                    
                    <TouchableOpacity onPress={(e)=> e.stopPropagation} 
                    style={{width:"100%",height: scale(1), opacity:0, pointerEvents:"none"}}>

                        <View style={[ {paddingLeft:scale(33),}]} >
                            <TextInput ref={inputRef} style={[{ fontFamily:
                            "Inter-Light", fontSize:scale(25), height: "100%"}] }
                                    placeholder={'Enter Confirmation Code '}
                                    keyboardType='number-pad'
                                    onChangeText={(value)=> handelInput(value)}
                                    textContentType="oneTimeCode"
                                    value={inputCode}
                                    maxLength={6}
                                />
                        </View>
                    </TouchableOpacity>

                    
                    <View style={[s`flex-row`, {alignContent:"center",paddingTop:scale(10),
                paddingLeft:scale(33) }]}>
                        
                        <CD_Timer   count={120} />

                        <TouchableOpacity style={{ 
                            marginLeft:normalize(20), justifyContent:"center", 
                            alignContent:"center", paddingTop:"0.3%" }}>
                                
                                <Text style={{fontFamily: "Inter-Bold", 
                                fontSize:normalize(16), textDecorationLine:"underline"}} >
                                    {"Resend Code"}</Text>
                        </TouchableOpacity>
                        
                    </View>

                    {displayNetworkSign()}
                    

                    
                    <View style={[s`flex-row absolute bottom-10`, {width:"100%", justifyContent:"space-evenly"}]}>

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
            </TouchableWithoutFeedback>
            </KeyboardAvoidingView>
            
        </ResizableContainer>
      
    );
  };

  const styles = StyleSheet.create({
    customInputContainer: {
      marginLeft: normalize(22),
      marginRight: normalize(22),
      paddingTop: normalize(65),
    },
    
  });
export default VerifyEmailPage;

