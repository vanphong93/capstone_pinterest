const express = require("express");
const {
    getImages,
    uploadImage,
    deleteImage,
} = require("../controllers/imageControllers");
const { verifyToken } = require("../middlewares/baseToken");
const { upload } = require("../middlewares/upload");
const imageRoute = express.Router();
imageRoute.get("/images", getImages);
imageRoute.delete("/images/:id", deleteImage);
imageRoute.post("/upload", upload.single("dataUpload"), uploadImage);
module.exports = imageRoute;
