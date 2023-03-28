import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { Text, View, SafeAreaView, StatusBar, Image, TouchableOpacity} from 'react-native';
import { s } from "react-native-wind";
import { resizeMode } from 'react-native-wind/dist/styles/layout/resize-mode';
import ladyOnAChair from "../assets/img/LadyOnAChair.png"

const GetStarted = ()=> {
     const navigation = useNavigation();
        return (
            
        <SafeAreaView style={s`bg-white`}>

            <StatusBar
                barStyle={"dark-content"}>
            </StatusBar>

            <View style={s`bg-white`}>
    
              <View style={[ {justifyContent: 'center', alignItems: 'center', marginRight: 20}]}>
                <Image source={ladyOnAChair} style={{ resizeMode: "contain"}}/>
              </View>
      
              <View style={[s`pt-2`, {marginLeft: 35, marginRight: 50, height:"100%"}]}>

                    <Text style={[{fontFamily:"Inter-Bold", fontSize:32,lineHeight: 38.73 }]}>
                        {"Send money easily in Nigeria."}
                    </Text>
                    <Text style={[s`pt-4`,{fontFamily:"Inter-Light", fontSize:24}]}>{
                        '  \u2022'+ " low fees.\n"+
                        '  \u2022'+ " Fast transfer.\n"+
                        '  \u2022'+ " Easy to use.\n"+
                        '  \u2022'+ " Secured platform." }
                    </Text>
                    <Text style={[s`pt-3`,{fontFamily: "Inter-Regular", fontSize: 19.5, 
                        letterSpacing: 0.7, color:"#008751"}]}>
                        {"send and receive money with no wahala"}
                    </Text>

                    <View style={[s`pt-10`, {justifyContent: 'center', alignItems: 'center'}]}>

                        <TouchableOpacity style={[s`bg-black `, {width:"100%", height: 54, 
                            borderRadius: 19.43, justifyContent: 'center', alignItems: 'center'}]} onPress={()=> navigation.navigate('PNpage')}>

                            <Text style={[s`text-white text-center`,
                                {fontFamily: "Inter-Bold", fontSize: 17.93}]}>
                                    {"Get started"}
                            </Text>
                        </TouchableOpacity>
                    </View>                    
              </View>
            </View>
        </SafeAreaView>
          );
}
 
export default GetStarted;