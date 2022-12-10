import * as Setting from "./Setting";
import { SilentSignin, isSilentSigninRequired } from "casdoor-react-sdk";
import React from 'react';

function HomePage() {
  const isLoggedIn = () => {
    return localStorage.getItem("token") !== null;
  };

  if (isSilentSigninRequired()) {
    // if the `silentSignin` parameter exists, perform silent login processing
    return (
      <SilentSignin
        sdk={Setting.CasdoorSDK}
        isLoggedIn={isLoggedIn}
        handleReceivedSilentSigninSuccessEvent={() => {
          // jump to the home page here and clear silentSignin parameter
          window.location.href = "/";
        }}
        handleReceivedSilentSigninFailureEvent={() => {
          // prompt the user to log in failed here
          alert("login failed");
        }}
      />
    );
  }

  const renderContent = () => {
    if (isLoggedIn()) {
      return <div>Hello!</div>;
    } else {
      return <div>you are not logged in</div>;
    }
  };

  return renderContent();
}

export default HomePage;
