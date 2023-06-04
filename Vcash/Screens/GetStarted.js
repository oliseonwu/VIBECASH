import React from 'react';
import { Text, View, useWindowDimensions, Image, TouchableOpacity, StyleSheet} from 'react-native';
import { s } from "react-native-wind";
import { resizeMode } from 'react-native-wind/dist/styles/layout/resize-mode';
import { useNavigation } from '@react-navigation/native';
import ladyOnAChair from "../assets/img/LadyOnAChair.png"

const GetStarted = ()=> {

     const  REGULAR_SCREEN_WIDTH = 600; 
     const navigation = useNavigation();
     const {height, width} = useWindowDimensions();
     // it triggers a rerender when the height and width changes

        return (  
        <View style= {styles.container}>
        {/* Containers that sets it children views centered 
        horizontally and vertically for larger screens */}
        
        <View style={[s`bg-white`, width < REGULAR_SCREEN_WIDTH ? 
        styles.fullScreenSize : styles.defaultScreenSize ]}>
            {/* set the width and height of the screen */}

            <View style={[ {justifyContent: 'center', alignItems: 'center', marginRight: 20, height:"55%"}]}>
            <Image source={ladyOnAChair}  style={{ resizeMode: "contain", width:"100%", height:"100%" }}/>
            </View>
    
            <View style={[s`pt-2`, {marginLeft: 35, marginRight: 50, height: "40%" }]}>

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
        </View>
          );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
    // means set my children views centered horizontally and vertically
  },

    // use defult size for large screens like ipad and use fullScreen 
    // for phones.
  defaultScreenSize: {
    width: "62%",
    height: "60%"
  },
  fullScreenSize:{
    width: "100%",
    height: "100%"
  },
  
});
 
export default GetStarted;