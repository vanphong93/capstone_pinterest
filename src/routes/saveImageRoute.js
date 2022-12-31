const express = require("express");
const {
    createSave,
    getSaveById,
    deleteSave,
} = require("../controllers/saveControllers");
const { verifyToken } = require("../middlewares/baseToken");
const saveRoute = express.Router();
saveRoute.post("/save", verifyToken,createSave);
saveRoute.get("/save/:id",verifyToken, getSaveById);
saveRoute.delete("/save/:user_id/:image_id",verifyToken, deleteSave);
module.exports = saveRoute;
