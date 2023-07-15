


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
import { color } from 'react-native-reanimated';


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
    
    const VerifyCode = async() =>{
        setNetworkSignStatus(false);
        let currentTimeStamp = await fetchCurrentTime();
        console.log(currentTimeStamp)
        if(currentTimeStamp != null){
            currentTimeStamp = new Date(currentTimeStamp);

            hideKeyboard();

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
                        setIsCodeRejected(false);
                    }
                    else{ // invalid code
                    console.log("Invalid Code!");
                    setIsCodeRejected(true);

                    
                    }
                }
                else{ // code expired
                    console.log("code has expired!")
                    setIsCodeRejected(true);
                    // inputDeniedAnimation();
                    // addErrorVibration();
                }

                // // reset the input code
                // setInputCode("");
            })
            .catch((error) => {
                console.log('DECRYPTION FAILED ...', error);
            });
        }
        else{
            
        }
        
    }

    const clearInput = ()=>{
        setInputCode("");
        setIsCodeRejected(false);
    }

    // const inputDeniedAnimation = ()=>{
    // /////////////////////////////////////////
    // // BAD: Because if you send a signal to the custom 
    // // input using a state, you still have to manually 
    // // turn of the state var over here from the child 
    // // custom input component (child componnent)
    // // its just messy. its better to turn on and off
    // // state on the parent component and the child 
    // // state should react to that change.

    //     // // sends a turnOn signal to the
    //     // // custom input to make my 
    //     // // custom input shake
    //     // setInputAnimationState(true);
    // //////////////////////////////////////////
        
    //     setTimeout(()=>{
    //         // after 500 milisec send a 
    //         // turnOff signal to my custom 
    //         // input. (This doesn't turn
    //         // of the animation, animation
    //         // already has a duration.
    //         // This alows us to be able
    //         // to play the animation when
    //         // needed again).
    //         setInputAnimationState(false)        
    //     }, 500)
        
    // }

  
        
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



    
    const displayNextBtn = () =>{
        // if there is an entry
        if(inputCode.length === 6){ 
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
                                    onChangeText={(value)=> handelInput(value)}
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

