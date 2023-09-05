import { View, Text } from "react-native";
import React from "react";
import Parse from "../../parse-config";
import Bugsnag from "@bugsnag/expo";
import { captureLog, handelError } from "./logs";

// get record from table name where fieldname is === "equalTo"
export const getRecordsFromDB = async (tablename, fieldName, equalTo) => {
  const parseQuary = new Parse.Query(tablename).equalTo(fieldName, equalTo);

  let records = null;

  await parseQuary
    .find()
    .then((result) => {
      records = result;
    })
    .catch((error) => {
      console.log("Error --> parseFunction(getRecordFromDB): ", error);
    });

  return records;
};

export const sendEmail = async (email) => {
  try {
    const result = await Parse.Cloud.run("sendVCodeAndSaveToDB", {
      destination: email,
      channel: "email",
    });

    // Rember to remove in parse cloud too!!!
    captureLog(
      "REMEMBER TO REMOVE!!\nYour verification code is " + result.code
    );
    return result.sent;
  } catch (error) {
    handelError(new Error("Error Sending email to user: " + error));
    return false;
  }
};

export const verifyCode = async (
  userEmailOrPhoneNum,
  userCode,
  verificationType
) => {
  // its a unique id for a device
  // const installationId = await Parse._getInstallationId();

  try {
    const result = await Parse.Cloud.run("verifyCodeAndGenerateSessionToken", {
      userData: userEmailOrPhoneNum,
      verificationType: verificationType,
      userCode: userCode,
    });

    if (result.sessionToken !== undefined) {
      captureLog(userEmailOrPhoneNum + " sucessfully enter the correct code.");
    } else {
      captureLog(userEmailOrPhoneNum + " entered a wrong or expired code.");
    }

    return {
      staus: result.verificationStatus,
      session:
        result.sessionToken != undefined ? result.sessionToken : undefined,
    };
  } catch (error) {
    handelError(new Error("Error verifying the code: " + error.message));
  }
};

export const loginUsingSessionToken = (sessionToken) => {
  Parse.User.become(sessionToken)
    .then((user) => {
      // The user is now authenticated and set as the current user
      captureLog(user.getUsername() + " logged in!");
    })
    .catch((error) => {
      handelError(new Error("Error logging in:: " + error.message));
    });
};

export const generateRandomStr = async () => {
  try {
    const result = await Parse.Cloud.run("generateRandomStr", {});

    return result;
  } catch (error) {
    handelError(new Error("Error generating password: " + error.message));
  }
};

export const logOutCurrentUser = async () => {
  //get the currently logged in user
  const currentUser = await Parse.User.currentAsync();
  let username = null;

  if (currentUser) {
    username = currentUser.getUsername();

    Parse.User.logOut(currentUser)
      .then(() => {
        captureLog(username + " Logged out!");
      })
      .catch((error) => {
        handelError(
          new Error("Error logging out previous user: " + error.message)
        );
      });
  } else {
    console.log("No User to Logout");
  }
};

/**
 * requests a new verification code.
 * @param {string} email - The email of the user requesting verification code.
 *
 */
export const requestNewVerificationCode = async (email) => {
  try {
    const result = await Parse.Cloud.run("resendVerificationCode", {
      email: email,
    });

    console.log(result);
  } catch (error) {
    console.log(error.message);
  }
};

// Contributors

// Olise -- olisemeduap@yahoo.com
// logOutCurrentUser(), generatePswd()
// someFunction()

// Kevin -- kevin@yahoo.com
// logout(), anotherFunction()
// someFunction()
