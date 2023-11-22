import "./App.css";
import "@fontsource-variable/inter";

//firebase
import { createFirestoreInstance } from "redux-firestore";

// Chakra Theme
import { ChakraBaseProvider } from "@chakra-ui/react";
import { theme } from "@chakra-ui/pro-theme";
import { extendTheme } from "@chakra-ui/react";
import { app, firebaseConfig } from "fbConfig";
import { store } from "redux/store";
import { ReactReduxFirebaseProvider } from "react-redux-firebase";
import { Provider } from "react-redux";

const proTheme = extendTheme(theme);

const extenstion = {
  colors: { ...proTheme.colors, brand: proTheme.colors.teal },
  fonts: {
    heading: "'Inter Variable', -apple-system, system-ui, sans-serif",
    body: "'Inter Variable', -apple-system, system-ui, sans-serif",
  },
};
const myTheme = extendTheme(extenstion, proTheme);

function App() {
  const rrfProps = {
    firebase: app,
    config: firebaseConfig,
    dispatch: store.dispatch,
    createFirestoreInstance,
  };
  return (
    <Provider store={store}>
      <ReactReduxFirebaseProvider {...rrfProps}>
        <ChakraBaseProvider theme={myTheme}></ChakraBaseProvider>
      </ReactReduxFirebaseProvider>
    </Provider>
  );
}

export default App;
