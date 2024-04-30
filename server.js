const mongoose = require("mongoose");
const dotenv = require("dotenv");
const express = require("express");
const morgan = require("morgan");
const dbConnection = require("./config/database");
const categoryRoute = require("./routes/categoryRoute");
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
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`App running on http://localhost:${PORT}...`);
});
