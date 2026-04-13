require("dotenv").config();

const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const { login, createUser } = require("./controllers/users");
const auth = require("./middlewares/auth");

const errorHandler = require("./middlewares/errorHandler");
const { errors } = require("celebrate");
const { validateSignup, validateSignin } = require("./middlewares/validator");

const logRequests = require("./middlewares/logRequests");
const logErrors = require("./middlewares/logErrors");

const userRouter = require("./routes/users.js");
const cardRouter = require("./routes/cards.js");

const app = express();

app.use(express.json());

const allowedCors = [
  "https://webs.vc.chickenkiller.com",
  "http://localhost:3000",
  "http://localhost:5173",
];

const DEFAULT_ALLOWED_METHODS = "GET,HEAD,PUT,PATCH,POST,DELETE";

app.use(function (req, res, next) {
  const { origin } = req.headers;
  const { method } = req;

  if (allowedCors.includes(origin)) {
    res.header("Access-Control-Allow-Origin", origin);
  }

  if (method === "OPTIONS") {
    res.header("Access-Control-Allow-Methods", DEFAULT_ALLOWED_METHODS);

    const requestHeaders = req.headers["access-control-request-headers"];
    res.header("Access-Control-Allow-Headers", requestHeaders);

    return res.end();
  }

  next();
});

// app.use(
//   cors({
//     origin: [
//       "http://localhost:3000",
//       "http://localhost:5173",
//       "https://webs.vc.chickenkiller.com",
//     ],
//     credentials: true,
//   }),
// );

app.use(logRequests);

app.get("/crash-test", () => {
  setTimeout(() => {
    throw new Error("O servidor travará agora");
  }, 0);
});

app.post("/signin", validateSignin, login);
app.post("/signup", validateSignup, createUser);

mongoose.connect("mongodb://localhost:27017/aroundb");

const PORT = 3001;

app.use(auth);

app.use("/users", userRouter);
app.use("/cards", cardRouter);

app.use((req, res) => {
  res.status(404).json({
    message: "A solicitação não foi encontrada",
  });
});

app.use(errors());
app.use(logErrors);
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
