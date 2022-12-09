const express = require("express");
const { getUser } = require("../controllers/userControllers");
const userRoute = express.Router();
userRoute.get("/getUser",getUser);
module.exports = userRoute;
