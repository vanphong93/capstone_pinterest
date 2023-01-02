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
const { validation } = require("../middlewares/validation");
const imageRoute = express.Router();
imageRoute.get("/images", getImages);
imageRoute.get("/images/search", searchImg);
imageRoute.get("/user/:id", getImgByUserId);
imageRoute.get("/images/:id", getImgByImgID);
imageRoute.delete("/images/:id", verifyToken, deleteImage);
imageRoute.get("/upload/:image", (req, res) => {
    let { image } = req.params;
    let url = `${process.cwd()}/public/img/${image}`;
    res.sendFile(url, (err) => {
        if (err) {
            return res.status(404).send("failed");
        } else {
            return res.status(200).end();
        }
    });
});
imageRoute.post(
    "/upload",
    upload.single("dataUpload"),
    verifyToken,
    validation.emptyUpload,
    validation.sizeAndType,
    uploadImage
);
module.exports = imageRoute;
