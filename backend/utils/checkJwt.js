const { auth } = require("express-oauth2-jwt-bearer");

// Authorization middleware. When used, the Access Token must exist and be verified against the Auth0 JSON Web Key Set.

const checkJwt = auth({
  audience: "http://backend-api",
  issuerBaseURL: `https://dev-er0sav73jq1ma0d2.uk.auth0.com/`,
  tokenSigningAlg: "RS256",
});

module.exports = checkJwt;
