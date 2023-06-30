
import { Text, View, TextInput, useWindowDimensions, 
    TouchableWithoutFeedback, Keyboard, TouchableOpacity,
    Platform, KeyboardAvoidingView, Alert, Image} from 'react-native';
import { s } from "react-native-wind";
import ResizableContainer from '../assets/components/ResizableContainer';
import warningSign from "../assets/img/warning1.png"
import normalize  from '../assets/utilities/normalize';
import emailjs from '@emailjs/browser';
import 'react-native-get-random-values'
import CryptoJS from 'react-native-crypto-js';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {REACT_APP_PUBLIC_KEY,REACT_APP_SERVICE_ID,
    REACT_APP_TEMPLATE_ID, ENCRYPTION_KEY, CURRENT_TIME_API_LINK } from "@env"
import { useRef, useState, useContext } from 'react';
import { fetchCurrentTime } from '../assets/utilities/CurrentTime';
import AutoInputFocus from '../assets/components/AutoInputFocus';
import {firebase} from "../firebase-config"


const EmailPage = ({navigation}) => {
    // email pattern recorgnistion
    const pattern = /^[\w\d]+@[\w\d]+\.[\w\d]+$/;
    
    const {height, width} = useWindowDimensions();
    const [noNetworkSign, setNetworkSignStatus] = useState(false)
    const[email, setEmailState] = useState("")
    // how many times we automatically try to save the 
    // time stamp of when we sent the email, in the db
    // in case of network issues.
    const MAX_RETRY_COUNT = 3; 

    const inputRef = useRef(); // reference to the input DOM obj 
    const scale = normalize;
       
    
    const onClickNextBtn = async () => {
        Keyboard.dismiss()

        if(noNetworkSign){ // if ON
            setNetworkSignStatus(false); // turn OFF
        }
        

        var randomNum = crypto.getRandomValues(new Uint8Array(4));
        // get random number

        // make sure random num is greater than 100
       randomNum[0] = randomNum[0] < 100 ? randomNum[0]+ 100 :  randomNum[0];
       randomNum[1] = randomNum[1] < 100 ? randomNum[1]+ 100 :  randomNum[1];

       // create the code
       const code =randomNum[0]+"-"+randomNum[1]

       // fetch current time
       const currentTimeStamp = await fetchCurrentTime();

       
        
       // if we can't get the date from the internet
       // don't allow this process to go foward
       if(currentTimeStamp != null){
            // encrypt code
            await encryptAndSaveCode(code+"~"+currentTimeStamp);

            await sendEmail(code)
                .then(async()=>{

                // record that we sent to this email at a certain time
                // (we woun't wait for this step to be compelete)
            //    recordEmailAndTimeStampInDB(email,new Date(currentTimeStamp))

                // if keyboard is open wait for the keyboard
                // to go off the screen before navigating
                if(Platform.OS != "web"){
                    if(Keyboard.isVisible()){
                        setTimeout(()=>navigation.navigate(
                            'VerifyEmailPG',{email}),200)
                    }
                    else{
                        navigation.navigate(
                            'VerifyEmailPG',{email})
                    }
                }
                else{
                    navigation.navigate(
                        'VerifyEmailPG',{email})
                }
            }).catch(()=>{
                setNetworkSignStatus(true)
            })
       }
       else{
        setNetworkSignStatus(true)
       }
        
    }

    const sendEmail = async(code) =>{
        

//=========== Open when productionn ready =======================
       // send code to email
    //    await emailjs.send(REACT_APP_SERVICE_ID,REACT_APP_TEMPLATE_ID
    //     ,{message: code, EMAIL: email}, REACT_APP_PUBLIC_KEY )

    //     .then(async function(response) {
    //         console.log("Email sent!");

    //      }, function(error) {
    //         console.log('FAILED...Error sending email', error);
    //         throw TypeError("Email not sent")
    //      });
    

//============= Remember to remove =============================
        console.log('Your VerificationCode is %s', code);        
//==============================================================
        }


          
    const encryptAndSaveCode = async (code)=>{

        const encryptedCode = CryptoJS.AES.encrypt(code, ENCRYPTION_KEY).toString();
       
      await AsyncStorage.setItem(ENCRYPTION_KEY, encryptedCode)
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
          return  <TouchableOpacity  onPress={async()=>onClickNextBtn() }
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

    const displayNetworkSign = ()=>{
        if(noNetworkSign){
            return <View style={{marginLeft:scale(33), flexDirection:"row", alignItems:"center", 
              width:"100%", height: scale("17")}}>
            <View style={{ width:scale(20), height: "100%", paddingRight: scale(6)}}>
                <Image source={warningSign} style={{resizeMode:"contain",width: "100%", height: "100%",
            }}/>
            </View>

            <Text style={{fontFamily:"Inter-Light", fontSize:scale(15), color:"#FF0000"}}>No network service detected</Text>
             </View>
        }
       
       
        
    }

    // SAVES the email and time stamp in db
    const recordEmailAndTimeStampInDB = async (email,date, retryCount=0)=>{

    // Convert the date to a Firestore Timestamp
    const timestamp = firebase.firestore.Timestamp.fromDate(date);

    if(retryCount >= MAX_RETRY_COUNT){
        console.log('Maximum retry count exceeded. Failed to save email and timestamp in DB.');
    }
    else{
        await firebase.firestore() // get the firestore db
        .collection("emailCodeTracker") // specify the db table
        .add({email,timestamp})
        .then(()=>{
            console.log('New sent email recorded in db for ', email)
        })
        .catch((error)=>{
            console("Error saving sent email and timestamp to the DB: "+ error)

            // if there is an error saving info to DB retry again
            setTimeout(()=>{
                console.log("retrying to save set email and timestamp again..");
                recordEmailAndTimeStampInDB(email, date, retryCount+ 1);
            }, 2000)
        })
    } 
    }
    
    return (
        <ResizableContainer width={width}>
            <AutoInputFocus pageName={"EmailPage"} inputRef = {inputRef}  />
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
                                    value={email}
                                    onChangeText={(value)=> setEmailState(value)}
                                />
                        </View>
                    </TouchableOpacity>

                    {displayNetworkSign()}

                    
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