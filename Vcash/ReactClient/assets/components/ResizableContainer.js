import React from "react";
import { Text, useWindowDimensions, View, StyleSheet } from "react-native";
import { s } from "react-native-wind";
import { scale } from "react-native-size-matters";
import { useNavigation } from "@react-navigation/native";
import { position } from "react-native-wind/dist/styles/layout/position";
import { flex } from "react-native-wind/dist/styles/flex/flex";

const ResizableContainer = (props) => {
  const REGULAR_SCREEN_WIDTH = 600;

  return (
    <View style={styles.container}>
      {/* Containers that sets it children views centered 
        horizontally and vertically for larger screens */}

      <View
        style={[
          s`bg-white`,
          props.width < REGULAR_SCREEN_WIDTH
            ? styles.fullScreenSize
            : styles.defaultScreenSize,
        ]}
      >
        {/* set the width and height of the screen */}

        {props.children}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    // means set my children views centered horizontally and vertically
  },

  // use defult size for large screens like ipad and use fullScreen
  // for regular phone screens.
  defaultScreenSize: {
    width: "60%",
    height: "60%",
  },
  fullScreenSize: {
    width: "100%",
    height: "100%",
  },
});

export default ResizableContainer;
