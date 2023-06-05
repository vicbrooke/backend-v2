const express = require("express");
const app = express();
const cors = require("cors");

const {
  articleRouter,
  commentRouter,
  getApi,
  userRouter,
} = require("./routes/index");
const checkJwt = require("./utils/checkJwt");

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// This route doesn't need authentication
app.use("/api", getApi);

// This route needs authentication
app.use("/users", checkJwt, userRouter);
app.use("/articles", checkJwt, articleRouter);
app.use("/comments", checkJwt, commentRouter);

app.use((req, res, next) => {
  const error = new Error("Not found");
  error.status = 404;
  next(error);
});

app.use((error, req, res, next) => {
  const status = error.status || 500;
  const message = error.message || "Internal server error";
  res.status(status).send(message);
});

module.exports = app;
