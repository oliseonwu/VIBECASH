


import { Text, View, TextInput, useWindowDimensions, 
    TouchableWithoutFeedback, Keyboard, TouchableOpacity,
    Platform, KeyboardAvoidingView, Image} from 'react-native';
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


const VerifyEmailPage = ({navigation}) => {
    // email pattern recorgnistion
    const route = useRoute()
    const email = route.params.email;
    const inputRef = useRef(); // reference to the input DOM obj 
    const {height, width} = useWindowDimensions();
    const [noNetworkSign, setNetworkSignStatus] = useState(false)
    const [displayResendCode, setdisplayResendCode] = useState(false)
    const[inputCode, setInputCode] = useState("")
    
    const scale = normalize;
    
    const VerifyCode = async() =>{
        setNetworkSignStatus(false);
        let currentTimeStamp = await fetchCurrentTime();
        console.log(currentTimeStamp)
        if(currentTimeStamp != null){
            currentTimeStamp = new Date(currentTimeStamp);

            Keyboard.dismiss()

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
                    }
                }
                else{ // code expired
                    console.log("code has expired!")
                }

            
            })
            .catch((error) => {
                console.log('DECRYPTION FAILED ...', error);
            });
        }
        else{
            setNetworkSignStatus(true);
        }
        
    }
        
    const handelInput = (code) =>{
        

        // we just added a character
        if(code.length > inputCode.length){
            
            if(code.length === 3){
                code+="-";
            }
        }
        else{
            // we removed a character
            if(code.length === 3){
                code = code.substring(0, 2)    
            }
        }       
        setInputCode(code);
    }

    const displayResendButton=()=>{
        if(displayResendCode){
            return <TouchableOpacity style={{ 
                marginLeft:normalize(20), justifyContent:"center", 
                alignContent:"center", paddingTop:"0.3%" }}>
                    <Text style={{fontFamily: "Inter-Bold", 
                    fontSize:normalize(16), lineHeight:0}} >
                        {"Resend Code?"}</Text></TouchableOpacity>
        }
        
    }

    
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
            <AutoInputFocus pageName={"VerifyEmailPG"} inputRef = {inputRef}  />
            <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} keyboardVerticalOffset={25} 
            style={{height:"100%"}}>
            <TouchableWithoutFeedback onPress={()=>Keyboard.dismiss()}>

                <View style={[s`bg-white relative`, {height:'100%'}]}>
                    <Text style={[{fontFamily:"Inter-Medium", paddingLeft:scale(33), 
                                fontSize:scale(28), paddingTop: scale(37)}]}>
                        {"Verify Your Email"}
                        </Text>
                    
                    <Text style={[{fontFamily:"Inter-Light", paddingLeft:scale(33), 
                                fontSize:scale(19), paddingTop: scale(37),
                                paddingRight:scale(33)}]}>
                        <Text>{"Enter the six digit code we sent to your email"} </Text> 
                        <Text style={{fontFamily:"Inter-Bold"}}>{email}</Text>
                    </Text>
                    
                    <TouchableOpacity onPress={(e)=> e.stopPropagation} style={{width:"100%"}}>

                        <View style={[ {paddingTop: scale(7), paddingLeft:scale(33)}]}>
                            <TextInput ref={inputRef} style={[{ fontFamily:
                            "Inter-Light", fontSize:scale(19), height: scale(50)}] }
                                    placeholder={'Enter Confirmation Code '}
                                    keyboardType='number-pad'
                                    onChangeText={(value)=> handelInput(value)}
                                    value={inputCode}
                                    maxLength={7}
                                />
                        </View>
                    </TouchableOpacity>

                    
                    <View style={[s`flex-row `, {alignContent:"center",paddingTop:scale(10),
                paddingLeft:scale(33) }]}>
                        
                        <CD_Timer   count={120} displayResendCode = {setdisplayResendCode} />
                        {displayResendButton()}
                        
                    </View>

                    {displayNetworkSign()}
                    

                    
                    <View style={[s`flex-row absolute bottom-10`, {width:"100%", justifyContent:"space-evenly"}]}>

                        <TouchableOpacity onPress={()=> navigation.goBack()} 
                            style={[s`bg-black`, { width:"43.7%", height: scale(48), 
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

export default VerifyEmailPage;

