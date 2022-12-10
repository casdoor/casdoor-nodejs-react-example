import Sdk from "casdoor-js-sdk";

export const ServerUrl = "http://localhost:3001";

const sdkConfig = {
  serverUrl: "http://localhost:3001",
  clientId: "d79fd3c4e09a309fb3f5123",
  appName: "application_hnpzib",
  organizationName: "organization_4emn5k",
  redirectPath: "/callback",
};

export const CasdoorSDK = new Sdk(sdkConfig);
