import {
  LOGIN_ERROR,
  LOGIN_SUCCESS,
  SIGNUP_ADDING,
  SIGNUP_ADD_ERROR,
  SIGNUP_ADD_SUCCESS,
  SIGNUP_CLEAR,
} from "commons/const";

const initState = {
  authError: null,
  signupAdding: false,
  signupAddError: false,
  signupAdd: false,
};

export const newSignUpReducer = (state = initState, action) => {
  switch (action.type) {
    case SIGNUP_ADDING:
      return {
        ...state,
        signupAddError: null,
        signupAdd: false,
        signupAdding: true,
      };
    case SIGNUP_ADD_SUCCESS:
      return {
        ...state,
        signupAddError: null,
        signupAdd: true,
        signupAdding: false,
      };
    case SIGNUP_CLEAR:
      return {
        ...state,
        signupAddError: null,
        signupAdd: null,
        signupAdding: false,
      };
    case SIGNUP_ADD_ERROR:
      return {
        ...state,
        signupAdd: false,
        signupAddError: action.error,
        signupAdding: false,
      };
    case LOGIN_ERROR:
      return {
        ...state,
        authError: "Login failed",
      };
    case LOGIN_SUCCESS:
      return {
        ...state,
        authError: null,
      };

    default:
      return state;
  }
};

export default newSignUpReducer;
