import { View, Text, StyleSheet, Keyboard, Platform } from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
import InputCellMemo from './InputCell'
import {default as scale} from '../../utilities/normalize';
import * as Haptics from 'expo-haptics';
import * as Animatable from 'react-native-animatable';
const CustomInputGroup = (props) => {
  const [numbers, setNumbers] = useState(["","","","","",""]);
  const [isactiveJ, setIsActiveJ] = useState([false,false,false,
                                              false,false,false]);
  
  const [isRedModeOn, setIsRedModeOn] = useState(false);
  
  // holds the currennt active square index
  const activeSquareIndex = useRef(null);
  
   
   // run only when the value changes                                      
   useEffect(()=>{
    updateInputValue();
   }, [props.value])

   // run only when the Keyboard State change
   useEffect(()=>{
    // if parent says the keyboard is Active
    if(props.keyboardState){
      activateInput();
    }
    else{
      deactivateInput();
    }
   }, [props.keyboardState])

  // return the next index in numbers that has ""                                                      
  const getIndexOfNextEntrySpace = ()=>{
    var index = -1; // -1 means all number slots are filled
    
    for(var x=0; x < 6; x++){
      if(numbers[x] === ""){
        index = x;
        x= 100; // stop the for loop
      }
    }

    return index;
  }   
  
  
  const activateInput = ()=>{
    var isactiveJCopy;

    // get the index of next empty number slot
    const nextEmptySlotIndex = getIndexOfNextEntrySpace(); 

    // update my reference variable 
    activeSquareIndex.current = nextEmptySlotIndex;

    isactiveJCopy = [...isactiveJ];
    isactiveJCopy[nextEmptySlotIndex] = true;

    // focus on the hidden input.
    // (displays the keyboard)
    props.inputRef.current.focus()
    
    // set active state for all squares
    setIsActiveJ(isactiveJCopy)

    if(isRedModeOn){ 
      setIsRedModeOn((isRedModeOn)=>!isRedModeOn);
    } 
  }

  // deactivate the custom input
  const deactivateInput = () =>{
    const isactiveJCopy = [...isactiveJ];

    isactiveJCopy[activeSquareIndex.current] = false;
    activeSquareIndex.current = null;

    setIsActiveJ(isactiveJCopy);
  }

  // get the value from prop and
  // display it in InputCellMemo components
  const updateInputValue = ()=>{
    const numbersCopy = [...numbers];
    var stopIndex = null;
    
    for(var x = 0; x < numbers.length; x++){
      numbersCopy[x] = props.value.charAt(x);

      // if we encounter a "" update stop Index
      if(numbersCopy[x] === '' && stopIndex === null){
        stopIndex = x;
      }
    }

    setNumbers(numbersCopy);

    // happy accident. This will color the 
    // first box when the we reset the text
    // in the input to "" even if the keyboard
    // is off. {ADDRESSED ALREADY!}
    
    updateHighlightedBox(stopIndex);
    

    // if keyboard is still on 
    // if(props.isKeyboardActive){
    //   updateHighlightedBox(stopIndex);
    // }
  }

  const updateHighlightedBox =(nextIndex)=>{
    const isactiveJCopy = [...isactiveJ];
    const previousIndex = activeSquareIndex.current;

    // deactivate previous active index
    isactiveJCopy[previousIndex] = false;
    
    // update ref
    activeSquareIndex.current = nextIndex;

    // -1 is invalid
    if(nextIndex != -1){
      // highlight the next square
      isactiveJCopy[nextIndex] = true;
      setIsActiveJ(isactiveJCopy);
    }
    
  }
  const onAnimationBegin = ()=>{

    if(Platform.OS !== "web"){
      Haptics.notificationAsync(
        Haptics.NotificationFeedbackType.Error
      )
    }
  }

  const onAnimationEnd = ()=>{

    props.clearInput();

    // after the wrong input 
    // animation, set the
    // first block to red 
    setIsRedModeOn(true);
  }

  


  

  
  return ( 
    // props.animation can either be true or false which 
    // makes the custom input shake left and right 
    <Animatable.View animation={props.animation? "shake" :null} duration={200}
     onAnimationEnd={onAnimationEnd} onAnimationBegin={onAnimationBegin}>
      <View style={styles.container}>
        <InputCellMemo isActive={isactiveJ[0]} redMode={isRedModeOn} number={numbers[0]}/>
        <InputCellMemo isActive={isactiveJ[1]} number={numbers[1]}/>
        <InputCellMemo isActive={isactiveJ[2]} number={numbers[2]}/>

        <View style={styles.seperator}></View>

        <InputCellMemo isActive={isactiveJ[3]} number={numbers[3]}/>
        <InputCellMemo isActive={isactiveJ[4]} number={numbers[4]}/>
        <InputCellMemo isActive={isactiveJ[5]} number={numbers[5]}/>
      
      </View>
    </Animatable.View>
  )
    
    
}

const styles = StyleSheet.create({
  container: {
    
    flexDirection:"row",
    justifyContent:"flex-start",
    gap: scale(13.4),
    alignItems: "center",
    
    // flexBasis - sets the base width of an element. if the parent 
    //  view grows bigger, the child element stays at that constant width. if 
    //  the parent view goes smaller than the base with, the child element 
    // starts shrinking

    // flexGrow - decides how much extra space should be distributed to a flex
    // element.
    
  },

  seperator:{
    width: scale(19.29),
    height: scale(3),
    backgroundColor: "#8E969D"
  }
  
});
export default CustomInputGroup;