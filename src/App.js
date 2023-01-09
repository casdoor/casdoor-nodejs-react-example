// Copyright 2023 The Casdoor Authors. All Rights Reserved.
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//      http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

import React, { useState, useEffect } from 'react';
import './App.css';
import SDK from 'casdoor-js-sdk';
import {config} from "./Setting";

function App() {
  const [username, setUsername] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [sdk, setSdk] = useState(new SDK(config));
  const [tokenReceived, setTokenReceived] = useState(false);

  useEffect(() => {
    if (window.location.href.indexOf('code') !== -1) {
      if (!sessionStorage.getItem('token')) {
        sdk.signin("http://localhost:8080").then(res => {
          sessionStorage.setItem('token', res.token);
          setTokenReceived(true);
          setIsLoggedIn(true);
        });
      }
    }
  }, [sdk]);

  useEffect(() => {
    if (sessionStorage.getItem('token')) {
      getInfo().then(res => setInfo(res));

      async function getInfo() {
        let token = sessionStorage.getItem('token');
        if (!token) {
          return;
        }
        else {
          return fetch(`http://localhost:8080/api/getUserInfo?token=${token}`).then(res => res.json());
        }
      }

      function setInfo(res) {
        let userinfo = res;
        setUsername(userinfo.name);
      }
    }
  }, [tokenReceived])

  function gotoSignInPage() {
    window.location.href = sdk.getSigninUrl();
  }

  function signOut() {
    sessionStorage.removeItem("token");
    setTokenReceived(false);
    window.location.href = "http://localhost:9000";
  }

  return (
    <div className="login" style={{ textAlign: "center" }}>
      {
        <span id="result">userName: <span className="username">{username}</span></span>
      }
      <div style={{ width: "300px", height: "50px" }}>
        {
          isLoggedIn
            ? <button id="signOut" style={{ width: "200px", height: "50px" }} onClick={signOut}>Logout</button>
            : <button id="signIn" style={{ width: "200px", height: "50px" }} onClick={gotoSignInPage}>Login with Casdoor</button>
        }
      </div>
    </div>
  );
}

export default App;
