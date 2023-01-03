import SDK from 'https://unpkg.com/casdoor-js-sdk@latest/lib/esm/sdk.js'

export default function initSDK () {
  const sdkConfig = {
    serverUrl: "https://door.casdoor.com",
    clientId: "0ba528121ea87b3eb54d",
    appName: "app-casbin-oa",
    organizationName: "casbin",
    redirectPath: "/",
  }
  return new SDK(sdkConfig)
}
