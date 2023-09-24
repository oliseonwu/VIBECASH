import {
  Text,
  View,
  TextInput,
  useWindowDimensions,
  TouchableWithoutFeedback,
  Keyboard,
  TouchableOpacity,
  Platform,
  KeyboardAvoidingView,
  StyleSheet,
  Image,
} from "react-native";
import { s } from "react-native-wind";
import ResizableContainer from "../assets/components/ResizableContainer";
import warningSign from "../assets/img/warning1.png";
import { default as scale } from "../assets/utilities/normalize";
import emailjs from "@emailjs/browser";

import CryptoJS from "react-native-crypto-js";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { ENCRYPTION_KEY } from "@env";
import { useRef, useState, useContext } from "react";
import { fetchCurrentTime } from "../assets/utilities/CurrentTime";
import AutoInputFocus from "../assets/components/AutoInputFocus";
import {
  logOutCurrentUser,
  sendVCodeByEmail,
} from "../assets/utilities/parseFunctions";
// import {firebase} from "../firebase-config"
import Parse from "../parse-config";

const EmailPage = ({ navigation }) => {
  // email pattern recorgnistion
  const pattern = /^[\w\d]+@[\w\d]+\.[\w\d]+$/;

  const { height, width } = useWindowDimensions();
  const [noNetworkSign, setNetworkSignStatus] = useState(false);
  const [email, setEmailState] = useState("");

  const inputRef = useRef(); // reference to the input DOM obj

  const getRandomNumberInRange = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  };

  // makes sure the numbber is of length 3
  function formatNumber(number) {
    return String(number).padStart(3, "0");
  }

  const onClickNextBtn = async () => {
    // remove later

    await logOutCurrentUser();

    let isEmailSent = null;
    Keyboard.dismiss();

    // if(noNetworkSign){ // if ON
    //     setNetworkSignStatus(false); // turn OFF
    // }

    isEmailSent = await sendVCodeByEmail(email);

    if (isEmailSent === true) {
      if (Platform.OS != "web") {
        if (Keyboard.isVisible()) {
          setTimeout(
            () => navigation.navigate("VerifyEmailPG", { email }),
            200
          );
        } else {
          navigation.navigate("VerifyEmailPG", { email });
        }
      } else {
        navigation.navigate("VerifyEmailPG", { email });
      }
    } else {
      // maybe the email account is on hold
      // or on time out
      alert("You have requested code multiple times. Time to cool off.");
    }
  };

  const encryptItem = (item, key) => {
    const encryptedItem = CryptoJS.AES.encrypt(item, key).toString();

    return encryptedItem;
  };

  const saveToAsyncStorage = async (encryptedCode) => {
    await AsyncStorage.setItem(ENCRYPTION_KEY, encryptedCode)
      .then(() => {
        // Data stored successfully
        console.log("Code saved Successfully!");
      })
      .catch((error) => {
        console.log("FAILED to encrypt Email code ...", error);
      });
  };

  const displayNextBtn = () => {
    // if there is an entry
    if (pattern.test(email)) {
      return (
        <TouchableOpacity
          onPress={async () => onClickNextBtn()}
          style={[
            {
              width: "43.7%",
              height: scale(48),
              borderRadius: scale(19.43),
              justifyContent: "center",
              alignItems: "center",
              backgroundColor: "#008751",
            },
          ]}
        >
          <Text
            style={[
              s`text-white text-center`,
              { fontFamily: "Inter-Bold", fontSize: scale(17.93) },
            ]}
          >
            {"Next"}
          </Text>
        </TouchableOpacity>
      );
    } else {
      return (
        <TouchableOpacity
          style={[
            {
              width: "43.7%",
              height: scale(48),
              borderRadius: scale(19.43),
              justifyContent: "center",
              alignItems: "center",
              backgroundColor: "#008751",
              opacity: 0.5,
            },
          ]}
          disabled={true}
        >
          <Text
            style={[
              s`text-white text-center`,
              { fontFamily: "Inter-Bold", fontSize: scale(17.93) },
            ]}
          >
            {"Next"}
          </Text>
        </TouchableOpacity>
      );
    }
  };

  const displayNetworkSign = () => {
    if (noNetworkSign) {
      return (
        <View
          style={{
            marginLeft: scale(33),
            flexDirection: "row",
            alignItems: "center",
            width: "100%",
            height: scale("17"),
          }}
        >
          <View
            style={{ width: scale(20), height: "100%", paddingRight: scale(6) }}
          >
            <Image
              source={warningSign}
              style={{ resizeMode: "contain", width: "100%", height: "100%" }}
            />
          </View>

          <Text
            style={{
              fontFamily: "Inter-Light",
              fontSize: scale(15),
              color: "#FF0000",
            }}
          >
            No network service detected
          </Text>
        </View>
      );
    }
  };

  // SAVES the email and time stamp in db
  const recordEmailAndTimeStampInDB = async (email, date) => {
    try {
      //create a new Parse Object instance
      const newPerson = new Parse.Object("userRestrictions");

      //define the attributes you want for your Object
      newPerson.set("email", email);

      //save it on Back4App Data Store
      await newPerson.save();
    } catch (error) {
      console.log("Error saving new userRestrictions: ", error);
    }
  };

  return (
    <ResizableContainer width={width}>
      <AutoInputFocus pageName={"EmailPage"} inputRef={inputRef} />

      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        keyboardVerticalOffset={Platform.OS === "ios" ? scale(25) : scale(0)}
        style={{ height: "100%" }}
      >
        <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
          <View style={[s`bg-white relative`, { height: "100%" }]}>
            <Text
              style={[
                {
                  fontFamily: "Inter-Medium",
                  paddingLeft: scale(33),
                  fontSize: scale(28),
                  paddingTop: scale(37),
                },
              ]}
            >
              {"Enter your email"}
            </Text>

            <TouchableOpacity
              onPress={(e) => e.stopPropagation}
              style={{ width: "100%" }}
            >
              <View style={[{ paddingTop: scale(7), marginLeft: scale(33) }]}>
                <TextInput
                  ref={inputRef}
                  style={[
                    {
                      fontFamily: "Inter-Light",
                      fontSize: scale(20),
                      height: scale(50),
                    },
                  ]}
                  placeholder={"Email Address"}
                  autoCapitalize="none"
                  keyboardType="email-address"
                  value={email}
                  onChangeText={(value) =>
                    setEmailState(value.replace(/\s/g, ""))
                  }
                  textContentType="emailAddress"
                />
              </View>
            </TouchableOpacity>

            {displayNetworkSign()}

            <View
              style={[
                s`flex-row absolute bottom-10`,
                { width: "100%", justifyContent: "space-evenly" },
              ]}
            >
              <TouchableOpacity
                onPress={() => navigation.goBack()}
                style={[
                  s`bg-black`,
                  {
                    width: "43.7%",
                    height: scale(48),
                    borderRadius: scale(19.43),
                    justifyContent: "center",
                    alignItems: "center",
                  },
                ]}
              >
                <Text
                  style={[
                    s`text-white text-center`,
                    { fontFamily: "Inter-Bold", fontSize: scale(17.93) },
                  ]}
                >
                  {"Use Phone"}
                </Text>
              </TouchableOpacity>

              {displayNextBtn()}
            </View>
          </View>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </ResizableContainer>
  );
};

export default EmailPage;
