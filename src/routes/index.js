const express = require("express");
const imageRoute = require("./imageRoute");
const userRoute = require("./userRoute");
const rootRoute = express.Router();
rootRoute.use("/user-management", userRoute);
rootRoute.use("/image-management", imageRoute);
module.exports = rootRoute;
