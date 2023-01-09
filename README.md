<h1 align="center" style="border-bottom: none;">Casdoor NodeJS React Example</h1>

## Architecture

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app) and [Express](https://expressjs.com/).

The example includes two parts:

Name | SDK                | Language             | Source code
----|--------------------|----------------------|----
Frontend | casdoor-js-sdk     | Javascript + React   | https://github.com/casdoor/casdoor-nodejs-react-example/tree/master/src 
Backend | casdoor-nodejs-sdk | JavaScript + Express | https://github.com/casdoor/casdoor-nodejs-react-example/tree/master/backend 

## Installation

Example uses Casdoor to manage members. So you need to create an organization and an application for the example in a Casdoor instance.

### Necessary Configurations

#### Get the Code

```shell
git clone https://github.com/casdoor/casdoor
git clone https://github.com/casdoor/casdoor-nodejs-react-example
```

#### Run Example
- Run Casdoor
- Configure

Front end:

## Available Scripts

In the project directory, you can run:

### `yarn install`

Installs all necessary dependencies.

### `node backend/server.js`

Runs the backend powered by Express at [http://localhost:8080](http://localhost:8080).

### `yarn start`

Runs the app in the development mode.\

Note that the port running frontend is set in `package.json`:

`"start": "PORT=9000 react-scripts start"`

Open [http://localhost:9000](http://localhost:9000) to view it in your browser. This setting should be in accordance with casdoor application configuration.

The page will reload when you make changes.\
You may also see any lint errors in the console.

## Demo

*Password input is clipped out of the recording.*

![Casdoor Login.gif](https://s2.loli.net/2023/01/04/D9uIzdifLV2vh5y.gif)
