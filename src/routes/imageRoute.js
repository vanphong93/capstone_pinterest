const express = require("express");
const {
    getImages,
    uploadImage,
    deleteImage,
    getImgByImgID,
    getImgByUserId,
    searchImg,
} = require("../controllers/imageControllers");
const { verifyToken } = require("../middlewares/baseToken");
const { upload } = require("../middlewares/upload");
const imageRoute = express.Router();
imageRoute.get("/images", getImages);
imageRoute.get("/images/search", searchImg);
imageRoute.get("/images/:id", getImgByImgID);
imageRoute.get("/user/:id", getImgByUserId);
imageRoute.delete("/images/:id", verifyToken, deleteImage);
imageRoute.post("/upload", upload.single("dataUpload"), uploadImage);
module.exports = imageRoute;
