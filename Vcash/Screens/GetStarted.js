
import { Text, View, useWindowDimensions, Image, TouchableOpacity, StyleSheet, PixelRatio} from 'react-native';
import { s } from "react-native-wind";
import { resizeMode } from 'react-native-wind/dist/styles/layout/resize-mode';
import { useNavigation } from '@react-navigation/native';
import ladyOnAChair from "../assets/img/LadyOnAChair.png"
import normalize from '../assets/utilities/normalize';
import ResizableContainer from '../assets/components/ResizableContainer';



const GetStarted = ()=> {
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
          <ResizableContainer width={width}>
            
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
            
          </ResizableContainer>
          );
};
 
export default GetStarted;