import axios from "axios";
import config from "../../config";

// const config.API_URL = "http://192.168.20.112:8085";
// const config.API_URL = "http://192.168.1.143:8085";

export function login(username, password, navigation) {
  return async dispatch => {
    const user = {
      username,
      password
    };
    try {
      dispatch({ type: "AUTHENTICATING" });
      let response = await axios.post(`${config.API_URL}/api/login`, user);

      if (response.status !== 200) {
        return dispatch({ type: "LOGIN_FAILURE" });
      }
      dispatch({ type: "LOGIN_SUCCESS", payload: response.data });
      return navigation.navigate("App");
      return dispatch({ type: "AUTHENTICATING", payload: response.data });
    } catch (err) {
      console.log(err);
      return dispatch({ type: "LOGIN_FAILURE" });
    }
  };
}

export function register(user, navigation) {
  return async dispatch => {
    console.log(user);
    dispatch({ type: "AUTHENTICATING" });
    if (checkUser(user) === false)
      return dispatch({ type: "REGISTER_USER_FAILURE" });
    try {
      let response = await axios.post(`${config.API_URL}/api/register`, user);
      dispatch({
        type: "REGISTERING_USER",
        payload: user
      });
      navigation.navigate("VerifyAccount");
    } catch (err) {
      console.log(err);
      return dispatch({ type: "REGISTER_USER_FAILURE" });
    }
  };
}

export function verify(user, verificationCode, navigation) {
  return async dispatch => {
    if (!verificationCode) return dispatch({ type: "VERIFY_FAILURE" });
    try {
      let response = await axios.post(`${config.API_URL}/api/verify`, {
        user,
        verificationCode
      });
      dispatch({ type: "VERIFY_SUCCESS", payload: response.data });
      return navigation.navigate("Home");
    } catch (err) {
      console.log(err);
      return dispatch({ type: "VERIFY_FAILURE" });
    }
  };
}

function checkUser(user) {
  if (user.name && user.email && user.phone && user.password) {
    return true;
  } else {
    return false;
  }
}
