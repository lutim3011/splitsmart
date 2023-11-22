// redux
import { rootReducer } from "redux/reducer/rootReducer";
import thunk from "redux-thunk";
import { configureStore } from "@reduxjs/toolkit";
// Firebase Settings
import { reduxFirestore, getFirestore } from "redux-firestore";
import { getFirebase } from "react-redux-firebase";
import { firebaseConfig } from "fbConfig";

export const store = configureStore({
  reducer: rootReducer,
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware().concat(
      thunk.withExtraArgument({
        getFirebase,
        getFirestore,
      })
    ),
  enhancers: [reduxFirestore(firebaseConfig)],
});
