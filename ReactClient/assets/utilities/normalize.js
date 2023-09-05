import { PixelRatio, Dimensions } from "react-native";

const ratio = PixelRatio.get();
// Pixel density is a calculation that returns the number
// of physical pixels per inch on a screen or display of a device.

// Pixel density refers to the number of pixels packed into
// a given display area, typically measured in pixels per
// inch (PPI) or dots per inch (DPI).

// convert a size the best fit size possible based on the
// pixel ratio and the screen size

const normalize = (size) => {
  var { width, height } = Dimensions.get("window");
  const PHONE_SCREEN_WIDTH = 600;

  // if the screen width is bigger than
  // phone screen size
  if (width > PHONE_SCREEN_WIDTH) {
    //re-adjust the width and height
    // for tablet since its screen
    // will be shown in a small window

    width *= 60 / 100;
    height *= 60 / 100;
  }

  if (ratio < 2) {
    if (width < 360) {
      size *= 0.7; //test
    } else if (height < 300) {
      size *= 0.4; //test
    } else if (height < 500) {
      size *= 0.5; //test
    } else if (height < 667) {
      size *= 0.8; //test
    } else if (height >= 667 && height <= 735) {
      size *= 0.9; // Tested
    } else {
      // TOUCHED (07/12/23)
      if (width < 400) {
        size *= 0.9;
      } else {
        size *= 1.0;
      }
      /////////////////////
    }
  }

  if (ratio >= 2 && ratio < 3) {
    // from 2 to 2.99
    if (width < 360) {
      size *= 0.6; //test
    } else if (height < 300) {
      size *= 0.35; //test
    } else if (height < 500) {
      size *= 0.45; //test
    } else if (height < 667) {
      size *= 0.75; //test
    } else if (height >= 667 && height <= 735) {
      size *= 0.76; // TOUCHED (07/12/23)
    } else {
      // TOUCHED (07/12/23)
      if (width < 400) {
        size *= 0.9;
      } else {
        size *= 1.0;
      }
    }
  } else if (ratio >= 3 && ratio < 3.5) {
    // from 3 to 3.49
    if (width < 360) {
      size *= 0.6; // tested
    } else if (height < 300) {
      size *= 0.35; //test
    } else if (height < 500) {
      size *= 0.45; //test
    } else if (height < 667) {
      size *= 0.75;
    } else if (height >= 667 && height <= 735) {
      size *= 0.85;
    } else {
      // TOUCHED (07/12/23)

      // we use width to distinguish
      if (width < 400) {
        size *= 0.9;
      } else {
        size *= 1.0; // iphone 12 pro max
      }
    }
  } else if (ratio >= 3.5) {
    // from 3.5 upwards
    if (width < 360) {
      size *= 0.6; //tested
    } else if (height < 300) {
      size *= 0.35; //test
    } else if (height < 500) {
      size *= 0.45; //test
    } else if (height < 667) {
      size *= 0.75;
    } else if (height >= 667 && height <= 735) {
      size *= 0.8;
    } else {
      size *= 0.85; // tested
    }
  }

  return size;
};

export default normalize;
