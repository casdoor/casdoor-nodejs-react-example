# Casdoor Node.js + React Example

[![Build](https://github.com/casdoor/casdoor-nodejs-react-example/actions/workflows/build.yml/badge.svg)](https://github.com/casdoor/casdoor-nodejs-react-example/actions/workflows/build.yml)
[![License](https://img.shields.io/github/license/casdoor/casdoor-nodejs-react-example)](https://github.com/casdoor/casdoor-nodejs-react-example/blob/master/LICENSE)
[![Discord](https://img.shields.io/discord/1022748306096537660?logo=discord&label=discord&color=5865F2)](https://discord.gg/5rPsrAzK7S)

An example web app that signs users in with [Casdoor](https://casdoor.ai/), with a React frontend and a Node.js (Express) backend. It shows the three sign-in modes of casdoor-js-sdk: redirecting to the Casdoor sign-in page, a popup window and a popup iframe.

| Part     | SDK                                                                 | Language             | Port |
|----------|---------------------------------------------------------------------|----------------------|------|
| Frontend | [casdoor-js-sdk](https://github.com/casdoor/casdoor-js-sdk)         | JavaScript + React   | 9000 |
| Backend  | [casdoor-nodejs-sdk](https://github.com/casdoor/casdoor-nodejs-sdk) | JavaScript + Express | 8080 |

Demo: [public/demo.mp4](public/demo.mp4)

## How it works

1. The frontend sends the user to the Casdoor sign-in page with `sdk.getSigninUrl()`, or opens it in a popup with `sdk.popupSignin()`.
2. After signing in, Casdoor redirects back to `http://localhost:9000/callback` with `code` and `state`.
3. The frontend checks `state` and sends the code to the backend with `sdk.signin()`: `POST /api/signin?code=...`.
4. The backend exchanges the code for an access token with `sdk.getAuthToken()` and returns it. The frontend keeps it in `sessionStorage`.
5. The frontend calls `GET /api/getUserInfo` with `Authorization: Bearer <token>`. The backend verifies the token with `sdk.parseJwtToken()` and returns the user in it.

The backend is [backend/server.js](backend/server.js), the frontend is [src/App.js](src/App.js).

## Prerequisites

- Node.js 18+ and Yarn
- A Casdoor server. The example is preconfigured for the public demo server https://door.casdoor.com, so it runs as is. To use your own, see [Casdoor installation](https://casdoor.ai/docs/basic/server-installation).

## Configuration

Skip this section to try the example with the public demo server.

In your Casdoor, create (or reuse) an organization and an application, and add `http://localhost:9000/callback` to the application's **Redirect URLs**. Then fill in both parts:

### Backend

[backend/server.js](backend/server.js), see [casdoor-nodejs-sdk](https://github.com/casdoor/casdoor-nodejs-sdk#️-configuration):

```js
const authCfg = {
  endpoint: 'https://door.casdoor.com', // Casdoor server URL
  clientId: '014ae4bd048734ca2dea', // client ID of the application
  clientSecret: 'f26a4115725867b7bb7b668c81e1f8f7fae1544d', // client secret of the application
  certificate: cert, // the certificate of the cert used by the application, see Casdoor -> Certs
  orgName: 'casbin', // organization of the application
  appName: 'app-casnode', // name of the application
};
```

### Frontend

[src/Setting.js](src/Setting.js), the same application as the backend:

```js
export const config = {
  serverUrl: "https://door.casdoor.com",
  clientId: "014ae4bd048734ca2dea",
  organizationName: "casbin",
  appName: "app-casnode",
  redirectPath: "/callback",
  signinPath: "/api/signin",
};
```

## Run

```shell
git clone https://github.com/casdoor/casdoor-nodejs-react-example
cd casdoor-nodejs-react-example
yarn install
```

Backend, at http://localhost:8080:

```shell
yarn server
```

Frontend, at http://localhost:9000:

```shell
yarn start
```

Open http://localhost:9000, choose a sign-in mode and click **Login with Casdoor**.

## Resources

- [Casdoor documentation](https://casdoor.ai/docs/overview)
- [casdoor-nodejs-sdk](https://github.com/casdoor/casdoor-nodejs-sdk)
- [casdoor-js-sdk](https://github.com/casdoor/casdoor-js-sdk)
- More frontends with a Node.js backend: [casdoor-nodejs-angular-example](https://github.com/casdoor/casdoor-nodejs-angular-example)

## License

[Apache-2.0](LICENSE)
