const express = require("express");
const {
    getComment,
    getCommentByImg,
    deleteComment,
    createCommnet,
} = require("../controllers/commentControllers");
const commentRoute = express.Router();
const { verifyToken } = require("../middlewares/baseToken");
const { validation } = require("../middlewares/validation");
commentRoute.get("/comments", getComment);
commentRoute.get("/check", getComment);
commentRoute.get("/comments/:id", getCommentByImg);
commentRoute.delete("/comments/:id", verifyToken, deleteComment);
commentRoute.post(
    "/comments",
    verifyToken,
    validation.emptyComment,
    createCommnet
);
module.exports = commentRoute;
