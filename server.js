const express = require("express");
const app = express();
const dotenv = require("dotenv");
dotenv.config({path: "./config.env"});
app.get("/", (req, res) => {
    res.send("Hello World");
})
const PORT  = process.env.PORT || 8000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
})