// redux
import  reducer  from "redux/reducer/rootReducer";
import thunk from "redux-thunk";
import { configureStore } from "@reduxjs/toolkit";
// Firebase Settings
import { reduxFirestore, getFirestore } from "redux-firestore";
import { getFirebase } from "react-redux-firebase";
import { app, firebaseConfig } from "fbConfig";
import { applyMiddleware, compose, createStore } from "redux";

export const store = createStore(
  reducer,
  compose(
    applyMiddleware(
      thunk.withExtraArgument({
        getFirebase,
        getFirestore,
        fb:app
      })
    ),
    reduxFirestore(firebaseConfig)
  )
);
