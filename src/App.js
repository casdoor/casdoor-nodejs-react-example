import { Route, BrowserRouter, Routes } from "react-router-dom";
import { AuthCallback } from "casdoor-react-sdk";
import * as Setting from "./Setting";
import HomePage from "./HomePage";
import React from 'react';

function App() {
  const authCallback = (
    <AuthCallback
      sdk={Setting.CasdoorSDK}
      serverUrl={Setting.ServerUrl}
      saveTokenFromResponse={(res) => {
        // @ts-ignore
        // save token
        localStorage.setItem("token", res.token);
      }}
      isGetTokenSuccessful={(res) => {
        // @ts-ignore
        // according to the data returned by the server,
        // determine whether the `token` is successfully obtained through `code` and `state`.
        return res.status === "ok";
      }}
    />
  );

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/callback" element={authCallback} />
        <Route path="/" element={<HomePage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
