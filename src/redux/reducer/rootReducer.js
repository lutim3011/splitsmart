import { combineReducers } from "redux";
import { firestoreReducer } from "redux-firestore";
import { firebaseReducer } from "react-redux-firebase";
import newSignUpReducer from "./userAuthReducer";

const rootReducers = combineReducers({
  newSignUpReducer,
  firestore: firestoreReducer,
  firebase: firebaseReducer,
});

export default rootReducers;
