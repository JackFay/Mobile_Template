import { combineReducers } from "redux";

const INITIAL_STATE = {
  isLoggedIn: false,
  error: false,
  loading: false,
  user: {
    legalName: "John Fay",
    email: "jrfay08@gmail.com",
    phone: "5734246735"
  },
  iHealthToken: null
};

function auth(state = INITIAL_STATE, action) {
  switch (action.type) {
    case "AUTHENTICATING": {
      return {
        ...state,
        loading: true
      };
    }
    case "LOGIN_SUCCESS":
      return {
        ...state,
        isLoggedIn: true,
        user: action.payload,
        loading: false,
        error: false
      };
    case "LOGIN_FAILURE": {
      return {
        ...state,
        error: "Incorrect username or password.",
        loading: false
      };
    }
    case "LOGOUT":
      return {
        ...state,
        isLoggedIn: false,
        error: false,
        user: null
      };
    case "REGISTER_USER_SUCCESS": {
      return {
        ...state,
        loading: false,
        error: false,
        user: action.payload
      };
    }
    case "REGISTER_USER_FAILURE": {
      return {
        ...state,
        loading: false,
        error: "Registration Failed. Please try again."
      };
    }
    case "VERIFY_FAILURE": {
      return {
        ...state,
        loading: false,
        error: "Verification failed. Please try again."
      };
    }
    case "VERIFY_SUCCESS": {
      return {
        ...state,
        loading: false,
        user: action.payload
      };
    }
    case "REGISTERING_USER": {
      return {
        ...state,
        user: action.payload
      };
    }
    case "ACCOUNT_EDITED": {
      return {
        ...state,
        user: action.payload,
        loading: false
      };
    }
    default:
      return state;
  }
}

const DEFAULT_REGISTRATION_STATE = {
  name: "",
  phone: "",
  email: "",
  password: ""
};

const AppReducer = combineReducers({
  auth
});

export default AppReducer;
