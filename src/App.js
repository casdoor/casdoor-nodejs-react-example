import React, { useState, useEffect } from 'react';
import './App.css';
import SDK from 'casdoor-js-sdk';

function App() {
  const [username, setUsername] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const sdkConfig = {
    serverUrl: "https://door.casdoor.com",
    clientId: "0ba528121ea87b3eb54d",
    appName: "app-casbin-oa",
    organizationName: "casbin",
    redirectPath: "/callback", // in accordance with casdoor configuration
  };
  const sdk = new SDK(sdkConfig);

  useEffect(() => {
    if (window.location.href.indexOf('code') !== -1) {
      if (!sessionStorage.getItem('token')) {
        sdk.signin("http://localhost:8080").then(res => {
          sessionStorage.setItem('token', res.token);
        });
      }
      async function getInfo() {
        let token = sessionStorage.getItem('token');
        if (!token) { return; }
        else {
          return fetch(`http://localhost:8080/api/getUserInfo?token=${token}`).then(res => res.json());
        }
      }

      setTimeout(() => {
        getInfo().then(res => setInfo(res));
      }, 100);

      function setInfo(res) {
        let userinfo = res;
        setUsername(userinfo.name);
      }
    }
  }, []);

  function gotoSignInPage() {
    window.location.href = sdk.getSigninUrl();
  }

  function signOut() {
    sessionStorage.removeItem("token");
    window.location.href = "http://localhost:9000";
  }

  return (
    <div className="login" style={{ width: "200px", textAlign: "center" }}>
      {
        isLoggedIn
          ? <span id="username" className="show">userName: <span className="username">{username}</span></span>
          : <span id="username" className="hidden">userName: <span className="username">{username}</span></span>
      }
      <div style={{ width: "300px", height: "50px" }}>
        {
          isLoggedIn
            ? <button id="signOut" style={{ width: "200px", height: "50px" }} onClick={signOut}>logout</button>
            : <button id="signIn" style={{ width: "200px", height: "50px" }} onClick={gotoSignInPage}>Login with Casdoor</button>
        }
      </div>
    </div>
  );
}

export default App;
