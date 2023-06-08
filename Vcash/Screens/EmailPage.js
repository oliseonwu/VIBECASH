
import { Text, View, TextInput, useWindowDimensions, 
    TouchableWithoutFeedback, Keyboard, TouchableOpacity,
    Platform, KeyboardAvoidingView} from 'react-native';
import { s } from "react-native-wind";
import ResizableContainer from '../assets/components/ResizableContainer';
import normalize  from '../assets/utilities/normalize';
import emailjs from '@emailjs/browser';
import 'react-native-get-random-values'
import CryptoJS from 'react-native-crypto-js';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {REACT_APP_PUBLIC_KEY,REACT_APP_SERVICE_ID,
    REACT_APP_TEMPLATE_ID, ENCRYPTION_KEY, } from "@env"
import { useRef, useState, useContext } from 'react';
import { isPageVisitedContex } from '../assets/components/visitedPagesListContex';

const EmailPage = ({navigation}) => {
    // email pattern recorgnistion
    const pattern = /^[\w\d]+@[\w\d]+\.[\w\d]+$/;
    
    const {height, width} = useWindowDimensions();
    const[email, setEmailState] = useState("")
    const inputRef = useRef(); // reference to the input DOM obj 
    const scale = normalize;
    let isPageAlreadyVisited =  useContext(isPageVisitedContex);
    let visitPageFunc = isPageAlreadyVisited.visitPage
    isPageAlreadyVisited = isPageAlreadyVisited.screenListVisitState.EmailPage;
    
    
    
    
    
    const sendEmail = () =>{
        Keyboard.dismiss()
        var randomNum = crypto.getRandomValues(new Uint8Array(4));
        // get random number

        // make sure random num is greater than 100
       randomNum[0] = randomNum[0] < 100 ? randomNum[0]+ 100 :  randomNum[0];
       randomNum[1] = randomNum[1] < 100 ? randomNum[1]+ 100 :  randomNum[1];

       // create the code
       const code =randomNum[0]+"-"+randomNum[1]

       // encrypt code
       encryptAndSaveCode(code);

//=========== Open when productionn ready =======================
       // send code to email
    //    emailjs.send(REACT_APP_SERVICE_ID,REACT_APP_TEMPLATE_ID
    //     ,{message: code, EMAIL: email}, REACT_APP_PUBLIC_KEY )

    //     .then(function(response) {
    //         console.log("Email sent!");
    // if(Keyboard.isVisible){
    //     setTimeout(()=>navigation.navigate(
    //         'VerifyEmailPG',{email}),200)
    // }
    // else{
    //     navigation.navigate(
    //         'VerifyEmailPG',{email})
    // }

    //      }, function(error) {
    //         console.log('FAILED...', error);
    //      });

//============= Remember to remove =============================
        console.log('Your VerificationCode is %s', code);

        // if keyboard is open wait for the keyboard
        // to go off the screen before navigating
        if(Keyboard.isVisible){
            setTimeout(()=>navigation.navigate(
                'VerifyEmailPG',{email}),200)
        }
        else{
            navigation.navigate(
                'VerifyEmailPG',{email})
        }
        
            
//==============================================================
        }

    const encryptAndSaveCode = (code)=>{

        const encryptedCode = CryptoJS.AES.encrypt(code, ENCRYPTION_KEY).toString();
       
       AsyncStorage.setItem(ENCRYPTION_KEY, encryptedCode)
       .then(() => {
            // Data stored successfully
            console.log("Code saved Successfully!")
       })
       .catch((error) => {
            console.log('FAILED to encrypt Email code ...', error);
       });

        }
    const displayNextBtn = () =>{
        // if there is an entry
        if(pattern.test(email)){
          return  <TouchableOpacity  onPress={()=>sendEmail() }
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
            return <TouchableOpacity  onPress={()=>sendEmail() }
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

    if(!isPageAlreadyVisited){  
        
        // auto focus after some time
        // after the view is visible
        setTimeout(() => {
            inputRef.current.focus()
            }, 500);

            // set page visited
            visitPageFunc("EmailPage")
    }
    
    return (
        <ResizableContainer width={width}>
            <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} keyboardVerticalOffset={25} 
            style={{height:"100%"}}>
            <TouchableWithoutFeedback onPress={()=>Keyboard.dismiss()}>

                <View style={[s`bg-white relative`, {height:'100%'}]}>
                    <Text style={[{fontFamily:"Inter-Medium", paddingLeft:scale(33), 
                                fontSize:scale(28), paddingTop: scale(37)}]}>
                        {"Enter your email"}
                        </Text>
                    
                    <TouchableOpacity onPress={(e)=> e.stopPropagation} style={{width:"100%"}}>

                        <View style={[ {paddingTop: scale(7), paddingLeft:scale(33)}]}>
                            <TextInput ref={inputRef} style={[{ fontFamily:
                            "Inter-Light", fontSize:scale(19), height: scale(50)}] }
                                    placeholder={'Email Address'}
                                    keyboardType="email-address"
                                    onChangeText={(value)=> setEmailState(value)}
                                />
                        </View>
                    </TouchableOpacity>

                    
                        <View style={[s`flex-row absolute bottom-10`, {width:"100%", justifyContent:"space-evenly"}]}>

                            <TouchableOpacity onPress={()=> navigation.goBack()} 
                                style={[s`bg-black`, { width:"43.7%", height: scale(48), 
                                    borderRadius: scale(19.43), justifyContent: 'center', alignItems: 'center',
                                    }]} >

                                    <Text style={[s`text-white text-center`,
                                        {fontFamily: "Inter-Bold", fontSize: scale(17.93)}]}>
                                            {"Use Phone"}
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

export default EmailPage;