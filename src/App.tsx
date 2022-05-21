import React from "react";
import { ChakraProvider } from "@chakra-ui/react";
import { Provider } from "react-redux";
import { Helmet } from "react-helmet";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import IndexRoutes from "./routes/index.routes";
import store from "./store";
import { PersistGate } from "redux-persist/integration/react";
import persistStore from "redux-persist/es/persistStore";
import { theme } from "./utils/theme";
import ErrorBoundary from "./components/ErrorBoundary";

const persistor = persistStore(store)

function App() {
  return (
    <>
    <ErrorBoundary>
       <Provider store={store}>
        <PersistGate persistor={persistor}>
          <ChakraProvider theme={theme}>
            <Helmet>
              <title>PM TOOL</title>
            </Helmet>
            <BrowserRouter>
              <Routes>
                <Route path="*" element={<IndexRoutes />} />
              </Routes>
            </BrowserRouter>
          </ChakraProvider>
        </PersistGate>
      </Provider>
    </ErrorBoundary>
     
    </>
  );
}

export default App;
