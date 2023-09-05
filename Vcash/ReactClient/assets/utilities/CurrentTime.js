import axios from "axios";
import { CURRENT_TIME_API_LINK } from "@env";

// fetches the current time
export const fetchCurrentTime = async () => {
  let currentTime = null;

  await axios
    .get(CURRENT_TIME_API_LINK)
    .then((res) => {
      currentTime = res.data.datetime;
    })
    .catch((error) => {
      console.error("Error fetching current time:", error);
    });

  return currentTime;
};
