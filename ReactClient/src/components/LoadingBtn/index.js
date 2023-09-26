import { View, Text, TouchableOpacity } from "react-native";
import { React } from "react";
import { ActivityIndicator } from "react-native-paper";
import { default as scale } from "../../utilities/normalize";
import styles from "./styles";
/**
 * Displays a loading button
 * @param {{title:String, width:number, height:number,
 *  isActive:boolean, loading:boolean, action:CallableFunction}} props
 * -
 * - title: title of the button
 * - isActive: sets button active or not
 * - loading: sets loading annimation on/off
 * - action: traget function to call when
 * button is pressed
 */

const LoadingBtn = (props) => {
  const displayLoadingAnimation = () => {
    if (props.loading) {
      return (
        <ActivityIndicator
          hidesWhenStopped={true}
          animating={props.loading}
          size={scale(22)}
          color="#FFFF"
        ></ActivityIndicator>
      );
    }
  };

  return (
    <TouchableOpacity
      onPress={async () => props.action()}
      style={[
        props.isActive && !props.loading
          ? styles.btnBgActive
          : styles.btnBgInActive,

        { width: props.width, height: props.height },
      ]}
      disabled={!props.isActive || props.loading}
    >
      <Text
        style={[
          styles.BtnText,
          props.loading ? { display: "none" } : { display: "flex" },
        ]}
      >
        {props.title}
      </Text>
      {displayLoadingAnimation()}
    </TouchableOpacity>
  );
};

export default LoadingBtn;
