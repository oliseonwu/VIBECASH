import { AppState } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRef, useEffect, memo } from "react";
import { fetchCurrentTime } from "./CurrentTime";
import { MINIMIZE_TIME_SAVE_KEY } from "@env";

function TimeOutCalc() {
  let backgroundTimestamp = useRef(null);
  let foregroundTimestamp = useRef(null);

  // save minimize tiem to async storage
  const saveTime = async (saveKey, data) => {
    await AsyncStorage.setItem(saveKey, data)
      .then(() => {
        // Data stored successfully
        console.log("minimize time saved Successfully!");
      })
      .catch((error) => {
        console.log("FAILED to store minimize time...", error);
      });
  };

  const calculateDuration = (foregroundTime, backgroundTime) => {
    return Math.floor(
      (foregroundTime.getTime() - backgroundTime.getTime()) * 0.001
    );
  };

  // if we switch between active to background state
  // this function is called
  const handleAppStateChange = async () => {
    const currentAppState = AppState.currentState;
    let minimizedDuration = null;
    let tempDate = null;
    // console.log("current app state: %s", currentAppState);

    switch (currentAppState) {
      case "background":
        tempDate = await fetchCurrentTime();
        backgroundTimestamp.current = new Date(tempDate);
        console.log("Backgroud counter activated!");
        break;

      case "active":
        if (backgroundTimestamp.current) {
          tempDate = await fetchCurrentTime();
          foregroundTimestamp.current = new Date(tempDate);

          if (foregroundTimestamp) {
            const backgroundDuration = calculateDuration(
              foregroundTimestamp.current,
              backgroundTimestamp.current
            );

            minimizedDuration = backgroundDuration;

            // //save minimize duration to asynnc storage
            // await saveTime(MINIMIZE_TIME_SAVE_KEY, minimizedDuration+"")
            backgroundTimestamp.current = null;
            foregroundTimestamp.current = null;
            console.log(
              "App Minimized duration: %s seconds\n",
              minimizedDuration
            );
          }
        }

        break;
      default:
        break;
    }
  };

  // Add the app state change listener
  useEffect(() => {
    let subsription = AppState.addEventListener("change", handleAppStateChange);

    return () => {
      subsription.remove();
    };
  }, []);
}

const TimeOutCalcMemo = memo(TimeOutCalc, () => true);
//do not re-render

export default TimeOutCalcMemo;
