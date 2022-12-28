const express = require("express");
const {
    getUser,
    singUp,
    login,
    editUser,
    deleteUser,
    avatarUser,
    getUserById,
} = require("../controllers/userControllers");
const { verifyToken } = require("../middlewares/baseToken");
const { avatar } = require("../middlewares/upload");
const userRoute = express.Router();
userRoute.get("/users", verifyToken, getUser);
userRoute.get("/users/:id", getUserById);
userRoute.post("/sing-up", singUp);
userRoute.post("/login", login);
userRoute.put("/user/:id", verifyToken, editUser);
userRoute.delete("/user/:id", verifyToken, deleteUser);
userRoute.get("/profile/:avatar", (req, res) => {
    let { avatar } = req.params;
    let url = `${process.cwd()}/public/avatar/${avatar}`;
    res.sendFile(url, (err) => {
        if (err) {
            return res.status(404).send("failed");
        } else {
            return res.status(200).end();
        }
    });
});
userRoute.post(
    "/user/avatar/:user_id",
    avatar.single("dataUpload"),
    avatarUser
);

module.exports = userRoute;
