// this file handels how we log info in our app
import { MODE } from "@env";
import Bugsnag from "@bugsnag/expo";
import { Platform } from "react-native";

/**
 * Logs a message to the console when in development mode and leaves a breadcrumb for Bugsnag.
 * @param {string} message - The message to log and leave as a breadcrumb.
 *
 */

export const captureLog = (message) => {
  if (MODE === "DEV") {
    console.log(message);
  }

  if (Platform.OS != "web") {
    Bugsnag.leaveBreadcrumb(message);
  }
};

/**
 *  notifies Bugsnag about an error that occured.
 * @param {Error} error - The error to notify Bugsnag about.
 */

export const handelError = (error) => {
  if (Platform.OS != "web") {
    Bugsnag.notify(error.message);
  }
};
