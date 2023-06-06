
import { Text, View, TextInput, useWindowDimensions, TouchableWithoutFeedback, Keyboard, TouchableOpacity} from 'react-native';
import { s } from "react-native-wind";
import ResizableContainer from '../assets/components/ResizableContainer';
import normalize  from '../assets/utilities/normalize';
import emailjs from '@emailjs/browser';
import {REACT_APP_PUBLIC_KEY,REACT_APP_SERVICE_ID,
    REACT_APP_TEMPLATE_ID, EMAIL_CODE} from "@env"





const EmailPage = ({navigation}) => {
    const {height, width} = useWindowDimensions();
    const scale = normalize;
    

    const stopPropagation = (e)=>{
        e.stopPropagation()
    }

    const sendEmail = () =>{
        console.log(REACT_APP_PUBLIC_KEY)
        St
        console.log(EMAIL_CODE)
        // emailjs.send(REACT_APP_SERVICE_ID,REACT_APP_TEMPLATE_ID
        //     ,{message:2345, EMAIL: "olisemeduaphilip@gmail.com"}, REACT_APP_PUBLIC_KEY )
        //     .then(function(response) {
        //         console.log('SUCCESS!', response.status, response.text);
        //      }, function(error) {
        //         console.log('FAILED...', error);
        //      });
        }

    return (
        <ResizableContainer width={width}>
            <TouchableWithoutFeedback onPress={()=>Keyboard.dismiss()}>

                <View style={[s`bg-white relative`, {height:'100%'}]}>
                    <Text style={[{fontFamily:"Inter-Medium", paddingLeft:scale(33), 
                                fontSize:scale(28), paddingTop: scale(37)}]}>
                        {"Enter your email"}
                        </Text>
                    
                    <TouchableOpacity onPress={(e)=> e.stopPropagation} style={{width:"100%"}}>

                        <View style={[ {paddingTop: scale(7), paddingLeft:scale(33)}]}>
                            <TextInput style={[{ fontFamily:
                            "Inter-Light", fontSize:scale(19), height: scale(50)}] }
                                    placeholder={'Email Address'}
                                    keyboardType="email-address"
                                />
                        </View>
                    </TouchableOpacity>


                    <View style={[s`flex-row absolute bottom-10`, {width:"100%", justifyContent:"space-evenly"}]}>

                        <TouchableOpacity onPress={()=> navigation.navigate('PNpage')} 
                            style={[s`bg-black`, { width:"43.7%", height: scale(48), 
                                borderRadius: scale(19.43), justifyContent: 'center', alignItems: 'center',
                                }]} >

                                <Text style={[s`text-white text-center`,
                                    {fontFamily: "Inter-Bold", fontSize: scale(17.93)}]}>
                                        {"Use Phone"}
                                </Text>
                        </TouchableOpacity>

                        <TouchableOpacity  onPress={()=>sendEmail()}
                            style={[{ width:"43.7%", height: scale(48), 
                                borderRadius: scale(19.43), justifyContent: 'center', alignItems: 'center',
                                backgroundColor:"#008751"}]} >

                                <Text style={[s`text-white text-center`,
                                    {fontFamily: "Inter-Bold", fontSize: scale(17.93)}]}>
                                        {"Next"}
                                </Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </TouchableWithoutFeedback>
            
        </ResizableContainer>
      
    );
  };

export default EmailPage;