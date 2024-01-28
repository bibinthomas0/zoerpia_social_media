import { ChakraProvider } from "@chakra-ui/react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import UserWrapper from "./Pages/User/UserWrapper/UserWrapper";
import { store,persistor } from "./Redux/userStore";
import { Provider } from "react-redux";
import AdminWrapper from "./Pages/Admin/AdminWrapper/AdminWrapper";
import { GoogleOAuthProvider,GoogleLogin } from '@react-oauth/google';
import { PersistGate } from 'redux-persist/integration/react';
import { SocketProvider } from "./provider/SocketProvider";
import { NotificationProvider } from "./Context/WebSocketService";

function App() {
  return (
    <GoogleOAuthProvider clientId="278473295980-0eailkbh9pdlgiqgctgqnmv45kmassup.apps.googleusercontent.com">

    <ChakraProvider>
      <BrowserRouter>

      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
      <NotificationProvider>

      <Routes>
        <Route path="*" element={<UserWrapper/>}/>
        <Route path="admincontrol/*" element={<AdminWrapper/>}/>
      </Routes>
      </NotificationProvider>

      </PersistGate>
      </Provider>

      </BrowserRouter>
     
    </ChakraProvider>
   
    </GoogleOAuthProvider>
  );
}

export default App;
