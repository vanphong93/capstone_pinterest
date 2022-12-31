const express = require("express");
const {
    createSave,
    getSaveById,
    deleteSave,
    // getDataSave,
} = require("../controllers/saveControllers");
const { verifyToken } = require("../middlewares/baseToken");
const saveRoute = express.Router();
saveRoute.post("/save", createSave);
// saveRoute.get("/save", getDataSave);
saveRoute.get("/save/:id", getSaveById);
saveRoute.delete("/save/:user_id/:image_id", deleteSave);
module.exports = saveRoute;
