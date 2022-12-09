const express = require("express");
const {
    getUser,
    singUp,
    login,
    editUser,
    deleteUser,
} = require("../controllers/userControllers");
const { verifyToken } = require("../middlewares/baseToken");
const userRoute = express.Router();
userRoute.get("/users", verifyToken, getUser);
userRoute.post("/sing-up", singUp);
userRoute.post("/login", login);
userRoute.put("/user/:user_id", verifyToken, editUser);
userRoute.delete("/user/:user_id", verifyToken, deleteUser);
module.exports = userRoute;
