const express = require("express");
const app = express();
const { auth, requiredScopes } = require("express-oauth2-jwt-bearer");
const cors = require("cors");

const {
  articleRouter,
  commentRouter,
  getApi,
  userRouter,
} = require("./routes/index");

// Authorization middleware. When used, the Access Token must
// exist and be verified against the Auth0 JSON Web Key Set.
const checkJwt = auth({
  audience: "http://backend-api",
  issuerBaseURL: `https://dev-er0sav73jq1ma0d2.uk.auth0.com/`,
});

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// This route doesn't need authentication
app.use("/api", getApi);

// This route needs authentication
app.use("/users", checkJwt, userRouter);
app.use("/articles", checkJwt, articleRouter);
app.use("/comments", checkJwt, commentRouter);

const checkScopes = requiredScopes("read:messages");

app.get("/api/private-scoped", checkJwt, checkScopes, function (req, res) {
  res.json({
    message:
      "Hello from a private endpoint! You need to be authenticated and have a scope of read:messages to see this.",
  });
});

module.exports = app;
