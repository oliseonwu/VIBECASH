import React from 'react'
import { s } from "react-native-wind";
import { SafeAreaView, Text, TextInput, View } from 'react-native';

const  PNPage = ()=> {
  return (
    <SafeAreaView style={s`bg-white`}>
        <View style={[s`bg-white`, {height:"100%"}]}>
            
            <View style={{marginLeft:27, marginTop:45}}>
                <Text style={[{fontFamily: "Inter-Medium", fontSize:27}]}>
                    {"Enter your phone or email"}
                </Text>
                
                <View style={s`flex-row items-center  `} >
                        <Text style={[s`pt-4`,{fontFamily: "Inter-Medium", fontSize:27}]}>
                            {"+234"}
                        </Text>
                        
                    <TextInput style={s`w-full h-full pl-2 `}
                            placeholder={'Enter number here'}
                            
                            keyboardType="numeric"
                        />
                    
                    
                </View>
                
            </View>
        
        </View>
    </SafeAreaView>
    

  );
}
export default PNPage;
