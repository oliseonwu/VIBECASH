import React from 'react';
import { Text, View, SafeAreaView, TextInput, TouchableWithoutFeedback, Keyboard, TouchableOpacity} from 'react-native';
import { s } from "react-native-wind";
import {scale} from 'react-native-size-matters';
import { position } from 'react-native-wind/dist/styles/layout/position';



const PNPage = ({navigation}) => {

    return (
        <SafeAreaView style={s`bg-white`}>
            <TouchableWithoutFeedback onPress={()=>Keyboard.dismiss()}>

                <View style={[s`bg-white relative`, {height:'100%'}]}>
                    <Text style={[{fontFamily:"Inter-Medium", paddingLeft:scale(27), 
                                fontSize:scale(23), paddingTop: scale(30)}]}>
                        {"Enter your phone or email"}
                        </Text>
                    

                    <View style={[s`flex-row items-center `,{paddingTop: scale(15)}]}>
                        <Text style={[{fontFamily:"Inter-Light", paddingLeft:scale(27), 
                                    fontSize:scale(17)}]}> 

                                    {"+234"}
                        </Text>

                        
                        <TextInput style={[s`pl-3 h-full w-full`,{ fontFamily:
                        "Inter-Light", fontSize:scale(17)}] }
                                placeholder={'Mobile number'}
                                keyboardType="numeric"
                            />
                    </View>


                <View style={s`flex-row absolute bottom-10 `}>
                    <TouchableOpacity onPress={()=> navigation.navigate('EmailInputScreen')} 
                        style={[s`bg-black`, { marginLeft:"5%",width:"43.7%", height: scale(38), 
                            borderRadius: 19.43, justifyContent: 'center', alignItems: 'center',
                            }]}>

                            <Text style={[s`text-white text-center`,
                                {fontFamily: "Inter-Bold", fontSize: 17.93}]}>
                                    {"Use Email"}
                            </Text>
                    </TouchableOpacity>

                    <TouchableOpacity onPress={()=> navigation.navigate('PNPage')} 
                        style={[{ marginLeft:"5%",width:"43.7%", height: scale(38), 
                            borderRadius: 19.43, justifyContent: 'center', alignItems: 'center',
                            backgroundColor:"#008751"}]} >

                            <Text style={[s`text-white text-center`,
                                {fontFamily: "Inter-Bold", fontSize: 17.93}]}>
                                    {"Next"}
                            </Text>
                    </TouchableOpacity>
                </View>
                </View>
            </TouchableWithoutFeedback>
            
        </SafeAreaView>
      
    );
  };

export default PNPage;