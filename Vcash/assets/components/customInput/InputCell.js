import { View, Text, StyleSheet } from 'react-native'
import React, { useState, memo } from 'react'
import {default as scale} from '../../utilities/normalize';
import { borderWidths } from 'react-native-wind/dist/styles/view/border-width';
import { justifyContent } from 'react-native-wind/dist/styles/flex/justify-content';
import { color } from 'react-native-reanimated';

const InputCell = (props) => {

  return (
    <View style={[styles.container,
       props.isActive? 
          styles.colorActive : styles.colorInActive]}>
      <Text style={[styles.textStyle]}>{props.number}</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    width: scale(44),
    height: scale(57),
    borderRadius: scale(10),
    borderWidth: scale(3),

    //flex direction is colum by default
    display: "flex",
    // center in the flex direction
    justifyContent: "center"
  },
  colorActive: {
    backgroundColor: "#EEF9F2",
    borderColor: "#A2DABE",
  },
  colorInActive: {
    backgroundColor: "white",
    borderColor: "#ECEDF0",
  },
  textStyle:{
    width: "100%",
    
    textAlign:"center",
    fontFamily: "Inter-SemiBold",
    fontSize: scale(24),
    color: "#908C8C"
    
  }
  
});

// we use a memo here to prevent other instances of this
// component from rerendering when their
//prop did't change. We do this by using memo
const InputCellMemo = memo(InputCell,
  (prevProps,nextProps) =>{
      // if previous props are thesam as 
      // next prop, don't re-render
      if(prevProps.isActive === nextProps.isActive
        && prevProps.number === nextProps.number){
          return true;
      }
      return false;
})

export default InputCellMemo