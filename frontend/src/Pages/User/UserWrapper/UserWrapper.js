import React from "react";
import Login from "../Auth/Login";
import Register from "../Auth/Register";
import { Route, Routes } from "react-router-dom";
import LoginNav from "../../../Components/Navbar/LoginNav";
import OtpVerification from "../../InBoth/OtpVerification";
import HomePage from "../Home/HomePage";
import Navbar from "../Home/Navbar";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import isAuthUser from "../../../utils/isAuthUser";
import { set_Authentication } from "../../../Redux/Authentication/AuthenticationSlice";
import PrivateRoute from "../Auth/PrivateRoute";
import ForgotPassword from "../Auth/ForgotPassword";
import { useLocation } from "react-router-dom";
import ProfilePage from "../Profile/ProfilePage";
import Chat from "../../Chat/Chat";
import ChatList from "../../Chat/ChatList";
import FPprofile from "../../../Components/FriendProfile/small/FPprofile";
import Friendprofile from "../firendsProfile/Friendprofile";
import ChatSelect from "../../../Context/ChatSelectContext";
import VirtualFriend from "../../Chat/ai/VirtualFriend";
import UserSettings from "../Settings/UserSettings";
import { NotificationProvider } from "../../../Context/WebSocketService";
import PhotosMain from "../../Photos/PhotosMain";

function UserWrapper() {
  const dispatch = useDispatch();
  const authentication_user = useSelector((state) => state.authentication_user);
  const location = useLocation();
  const currentPath = location.pathname;
  useEffect(() => {
    console.log(currentPath);
    return () => {};
  }, [currentPath]);

  const checkAuth = async () => {
    const isAuthenticated = await isAuthUser();
    dispatch(
      set_Authentication({
        name: isAuthenticated.name,
        isAuthenticated: isAuthenticated.isAuthenticated,
      })
    );
  };

  const getMessage = (msg) => {
    console.log(msg);
  };

  useEffect(() => {
    if (!authentication_user.name) {
      checkAuth();
    }
  }, [authentication_user]);
  const chatContainerStyle = {
    position: "absolute",
    height: "100%",
    zIndex: "44",
  };
  return (
    <>
      {/* <div  style={chatContainerStyle}><VirtualFriend  /> </div> */}
      {authentication_user.isAuthenticated === false ? (
        <LoginNav />
      ) : (
        <Navbar />
      )}
      <ChatSelect>
        <NotificationProvider>
          <Routes>
            <Route path="login" element={<Login />} />
            <Route path="register" element={<Register />} />
            <Route path="forgot" element={<ForgotPassword />} />
            <Route
              path="/otp"
              element={
                <PrivateRoute>
                  <OtpVerification />
                </PrivateRoute>
              }
            />
            <Route
              path="/*"
              element={
                <PrivateRoute>
                  <HomePage />
                </PrivateRoute>
              }
            />
            <Route
              path="/profile"
              element={
                <PrivateRoute>
                  <ProfilePage />
                </PrivateRoute>
              }
            />
            <Route path="user/:username" element={<Friendprofile />} />
            <Route path="photos" element={<PhotosMain/>} /> 
            <Route path="chat" element={<Chat />} />
            <Route path="chatlist" element={<ChatList />} />
            <Route path="/settings" element={<UserSettings />} />
          </Routes>
        </NotificationProvider>
      </ChatSelect>
    </>
  );
}

export default UserWrapper;
