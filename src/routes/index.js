const express = require("express");
const commentRoute = require("./commentRoute");
const imageRoute = require("./imageRoute");
const userRoute = require("./userRoute");
const rootRoute = express.Router();
rootRoute.use("/user-management", userRoute);
rootRoute.use("/image-management", imageRoute);
rootRoute.use("/comment-management", commentRoute);
module.exports = rootRoute;
