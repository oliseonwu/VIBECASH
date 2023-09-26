import { StyleSheet } from "react-native";
import { default as scale } from "../../utilities/normalize";

const styles = StyleSheet.create({
  btnBgActive: {
    width: "43.7%",
    height: scale(48),
    borderRadius: scale(19.43),
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#008751",
  },
  btnBgInActive: {
    width: "43.7%",
    height: scale(48),
    borderRadius: scale(19.43),
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#008751",
    opacity: 0.5,
  },
  BtnText: {
    fontFamily: "Inter-Bold",
    fontSize: scale(17.93),
    color: "#FFFF",
  },
});

export default styles;
