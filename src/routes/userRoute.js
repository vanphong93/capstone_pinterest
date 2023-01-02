const express = require("express");
const {
    getUser,
    signUp,
    login,
    editUser,
    deleteUser,
    avatarUser,
    getUserById,
} = require("../controllers/userControllers");
const { verifyToken } = require("../middlewares/baseToken");
const { avatar } = require("../middlewares/upload");
const { validation } = require("../middlewares/validation");
const userRoute = express.Router();
userRoute.get("/user", verifyToken, getUser);
userRoute.get("/user/:id", verifyToken, getUserById);
userRoute.post("/sign-up", validation.emptySign, signUp);
userRoute.post("/login", validation.emptyLogin, login);
userRoute.put("/user/:id", verifyToken, editUser);
userRoute.delete("/user/:id", verifyToken, deleteUser);
userRoute.post(
    "/avatar/:id",
    avatar.single("dataUpload"),
    verifyToken,
    validation.sizeAndType,
    avatarUser
);
userRoute.get("/avatar/:id/:file", (req, res) => {
    let { file } = req.params;
    let url = `${process.cwd()}/public/avatar/${file}`;
    res.sendFile(url, (err) => {
        if (err) {
            return res.status(404).send("failed");
        } else {
            return res.status(200).end();
        }
    });
});

module.exports = userRoute;
