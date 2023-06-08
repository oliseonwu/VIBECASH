import { Text, View, useWindowDimensions, TextInput, 
    TouchableWithoutFeedback, Keyboard, TouchableOpacity, 
    Platform, KeyboardAvoidingView} from 'react-native';
import { s } from "react-native-wind";
import normalize from '../assets/utilities/normalize';
import ResizableContainer from '../assets/components/ResizableContainer';
import { isPageVisitedContex } from '../assets/components/visitedPagesListContex';
import { useEffect, useRef, useContext } from 'react';



const PNPage = ({navigation}) => {

    const {height, width} = useWindowDimensions();
    const scale = normalize;
    const inputRef = useRef(); // reference to the input DOM obj 
    let isPageAlreadyVisited =  useContext(isPageVisitedContex);
    let visitPageFunc = isPageAlreadyVisited.visitPage
    isPageAlreadyVisited = isPageAlreadyVisited.screenListVisitState.PNpage;

    const stopPropagation = (e)=>{
        e.stopPropagation()
    }

    if(!isPageAlreadyVisited){
        

            // auto focus after some time
            // after the view is visible
            setTimeout(() => {
                inputRef.current.focus()
              }, 500);
            
            visitPageFunc("PNpage");
        
    }
    
    const goToEmailPage = () =>{
        
        if(Keyboard.isVisible()){
            Keyboard.dismiss()

            setTimeout(()=>{
                navigation.navigate('EmailPage')
            },300)
        }
        else{
            
            navigation.navigate('EmailPage')
        }
        
    }
    
    return (
    
        <ResizableContainer width={width}>
            <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} keyboardVerticalOffset={25} 
            style={{height:"100%"}}>
                <TouchableWithoutFeedback onPress={()=>Keyboard.dismiss()} >

                    <View style={[s`bg-white relative`, {height:'100%'}]}>
                        <Text style={[{fontFamily:"Inter-Medium", paddingLeft:scale(33), 
                                    fontSize:scale(28), paddingTop: scale(37)}]}>
                            {"Enter your phone or email"}
                            </Text>
                        

                        <View style={[s`flex-row items-center `,{paddingTop: scale(8)}]}>
                            <Text style={[{fontFamily:"Inter-Light", paddingLeft:scale(33), 
                                        fontSize:scale(18)}]}> 

                                        {"+234"}
                            </Text>

                            <TouchableOpacity onPress={(e)=> stopPropagation} style={{width:"90%"}}>
                                
                                <TextInput ref={inputRef} style={[s`pl-3 h-full w-full`,{ fontFamily:
                                "Inter-Light", fontSize:scale(19), height: scale(50) }] }
                                        placeholder={'Mobile number'}
                                        keyboardType="number-pad" 
                                    />
                            </TouchableOpacity>
                        </View>


                    <View style={[s`flex-row absolute bottom-10 `,{width:"100%", justifyContent: "space-evenly"}]}>
                        <TouchableOpacity onPress={goToEmailPage} 
                            style={[s`bg-black`, {width:"43.7%", height: scale(48), 
                                borderRadius: scale(19.43), justifyContent: 'center', alignItems: 'center',
                                }]}>

                                <Text style={[s`text-white text-center`,
                                    {fontFamily: "Inter-Bold", fontSize: scale(17.93), textAlign:"center",
                                    width:"100%"}]}>
                                        {"Use Email"}
                                </Text>
                        </TouchableOpacity>

                        <TouchableOpacity  
                            style={[{ width:"43.7%", height: scale(48), 
                                borderRadius: scale(19.43), justifyContent: 'center', alignItems: 'center',
                                backgroundColor:"#008751"}]} >

                                <Text style={[s`text-white text-center`,
                                    {fontFamily: "Inter-Bold", fontSize: scale(17.93), width:"100%", textAlign:"center"}]}>
                                        {"Next"}
                                </Text>
                        </TouchableOpacity>
                    </View>
                    </View>
                </TouchableWithoutFeedback>
            </KeyboardAvoidingView>
        </ResizableContainer>
      
    );
  };

  

export default PNPage;