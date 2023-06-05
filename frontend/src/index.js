import { Auth0Provider } from "@auth0/auth0-react";
import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";

const domain = process.env.REACT_APP_AUTH0_DOMAIN;
const clientId = process.env.REACT_APP_AUTH0_CLIENT_ID;

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Auth0Provider
    domain={domain}
    clientId={clientId}
    useRefreshTokens={true}
    authorizationParams={{
      redirect_uri: window.location.origin,
      scope: "openid profile email read:all write:all read:mine write:mine",
      audience: "http://backend-api",
    }}
  >
    <App />
  </Auth0Provider>
);
