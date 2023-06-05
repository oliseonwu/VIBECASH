
import { Text, View, useWindowDimensions, Image, TouchableOpacity, StyleSheet, PixelRatio} from 'react-native';
import { s } from "react-native-wind";
import { resizeMode } from 'react-native-wind/dist/styles/layout/resize-mode';
import { useNavigation } from '@react-navigation/native';
import ladyOnAChair from "../assets/img/LadyOnAChair.png"
import normalize from '../assets/utilities/normalize';

const GetStarted = ()=> {

     const  REGULAR_SCREEN_WIDTH = 600; 
     const navigation = useNavigation();
     const {height, width} = useWindowDimensions();
     
     // it triggers a rerender when the height and width changes

     // Testing
     const displayScreenUnits = () =>{
      if (width > 600){
        
       return  <Text>{"Width = "+ width*(60/100)+
             "\nHeight = "+ height*(60/100)+
             "\nPixel Density = "+ PixelRatio.get()   }</Text>
      }
      else{
       return <Text>{"Width = "+ width+
             "\nHeight = "+ height+
             "\nPixel Density = "+ PixelRatio.get()   }</Text>
      }
              
     }

        return (  
        <View style= {styles.container}>
        {/* Containers that sets it children views centered 
        horizontally and vertically for larger screens */}
        
        <View style={[s`bg-white`, width < REGULAR_SCREEN_WIDTH ? 
        styles.fullScreenSize : styles.defaultScreenSize ]}>
            {/* set the width and height of the screen */}

            <View style={[ {justifyContent: 'center', alignItems: 'center', marginRight: 20, height:"50%"}]}>
            <Image source={ladyOnAChair}  style={{ resizeMode: "contain", width:"100%", height:"100%" }}/>
            {/* {displayScreenUnits()} */}
            </View>
    
            <View style={[s`pt-2`, {marginLeft: 35, marginRight: 50, height: "50%" }]}>

                <Text style={[{fontFamily:"Inter-Bold", fontSize: normalize(32),lineHeight:normalize(38.73) }]}>
                    {"Send money easily in Nigeria."}
                </Text>
                <Text style={[{fontFamily:"Inter-Light", fontSize:normalize(24),
                paddingTop: normalize(18)}]}>{
                    '  \u2022'+ " low fees.\n"+
                    '  \u2022'+ " Fast transfer.\n"+
                    '  \u2022'+ " Easy to use.\n"+
                    '  \u2022'+ " Secured platform." }
                </Text>
                <Text style={[s`pt-3`,{fontFamily: "Inter-Regular", fontSize: normalize(19.5), 
                    letterSpacing: normalize(0.7), color:"#008751"}]}>
                    {"send and receive money with no wahala"}
                </Text>

                <View style={[{justifyContent: 'center', alignItems: 'center', paddingTop: normalize(30)}]}>

                    <TouchableOpacity style={[s`bg-black `, {width:"100%", height: normalize(54), 
                        borderRadius: normalize(19.43), justifyContent: 'center', alignItems: 'center'}]} onPress={()=> navigation.navigate('PNpage')}>

                        <Text style={[s`text-white text-center`,
                            {fontFamily: "Inter-Bold", fontSize: normalize(17.93)}]}>
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
    width: "60%",
    height: "60%"
  },
  fullScreenSize:{
    width: "100%",
    height: "100%"
  },
  
});
 
export default GetStarted;