const mongoose = require("mongoose");
const dotenv = require("dotenv");
const express = require("express");
const morgan = require("morgan");
const dbConnection = require("./config/database");
const categoryRoute = require("./routes/categoryRoute");
const AppError = require("./utils/Api-error");
const globalError = require("./Middlewares/errorMiddleware");
dotenv.config({ path: "./config.env" });
//! Connect To DB

dbConnection();
//! Express App
const app = express();
//! Middlewares
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
  console.log("Development mode");
}
app.use(express.json());

//! Route Mount
app.use("/api/v1/categories", categoryRoute);

app.all("*", (req, res, next) => {
  // const error = new Error(
  //   `Can't find this route ${req.originalUrl} on this server`
  // );
  // next(error.message);
  next(
    new AppError(`Can't find this route ${req.originalUrl} on this server`, 404)
  );
});
//! Global Error Handling Middleware
app.use(globalError);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`App running on http://localhost:${PORT}...`);
});
