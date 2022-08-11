import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import App from "./App";
import { store } from "./features/store";
import "./index.css";

// import { PersistGate } from "redux-persist/integration/react";
// import { persistStore } from "react-persist";

const root = ReactDOM.createRoot(document.getElementById("root"));
// let persistor = persistStore(store);
root.render(
  // <React.StrictMode>
  <Provider store={store}>
    {/* <PersistGate loading={null} persistor={persistor}> */}
    <App />
    {/* </PersistGate> */}
  </Provider>
  // </React.StrictMode>,
);
