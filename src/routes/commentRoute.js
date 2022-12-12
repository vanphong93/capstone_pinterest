const express = require("express");
const {
    getComment,
    getCommentByImg,
    deleteComment,
    createCommnet,
} = require("../controllers/commentControllers");
const commentRoute = express.Router();
commentRoute.get("/comments", getComment);
commentRoute.get("/comments/:id", getCommentByImg);
commentRoute.delete("/comments", deleteComment);
commentRoute.post("/comments", createCommnet);
module.exports = commentRoute;
