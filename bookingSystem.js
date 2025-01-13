const express = require("express");
const app = express();
const cron = require("node-cron");
require("dotenv").config();
const cors = require("cors");

app.use(express.json());
app.use(cors());

const bookingModule = require("./routes/bookingRoutes.js");

app.use("/api/hotel", bookingModule);

module.exports = app;
