const express = require("express");
const {
    getComment,
    getCommentByImg,
    deleteComment,
    createCommnet,
} = require("../controllers/commentControllers");
const commentRoute = express.Router();
const { verifyToken } = require("../middlewares/baseToken");
commentRoute.get("/comments", verifyToken, getComment);
commentRoute.get("/comments/:id", getCommentByImg);
commentRoute.delete("/comments/:id", verifyToken, deleteComment);
commentRoute.post("/comments", verifyToken, createCommnet);
module.exports = commentRoute;
