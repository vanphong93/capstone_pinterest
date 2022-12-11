const { successCode, failCode, errorCode } = require("../config/reponse");
const sequelize = require("../models/index");
const init_models = require("../models/init-models");
const bcrypt = require("bcrypt");
const models = init_models(sequelize);
const { parseToken } = require("../middlewares/baseToken");
const fs = require("fs");
const getImages = async (req, res) => {
    try {
        let data = await models.images.findAll();
        successCode(res, data, "Lấy dữ liệu thành công");
    } catch (error) {
        errorCode(res, "Lỗi sever");
    }
};
const uploadImage = async (req, res) => {
    try {
        let {
            filename: URL,
            image_name,
            description,
            data_created,
            user_id,
        } = {
            ...req.body,
            ...req.file,
        };
        let data = await models.images.create({
            image_name,
            description,
            data_created,
            user_id,
            URL,
        });
        successCode(res, data, "success");
    } catch (error) {
        errorCode(res, "Lỗi sever");
    }
};
const deleteImage = async (req, res) => {
    try {
        let { id: image_id } = req.params;
        let checkData = await models.images.findOne({ where: { image_id } });
        if (checkData) {
            let { URL } = checkData.dataValues;
            if (URL) {
                setTimeout(() => {
                    fs.unlinkSync(process.cwd() + "/public/img/" + URL);
                }, 5000);
            }
            let data = await models.images.destroy({ where: { image_id } });
            successCode(res, data, "Xóa thành công");
        } else {
            failCode(res, "", "Ảnh không tồn tại");
        }
    } catch (error) {
        console.log("error: ", error);
        errorCode(res, "Lỗi sever");
    }
};
const getImgByID = async (req, res) => {
    try {
        let { id: user_id } = req.params;
        let checkId = await models.users.findOne({ where: { user_id } });
        if (!checkId) {
            failCode(res, "", "User không tồn tại");
            return;
        }
        let checkData = await models.images.findAll({
            where: { user_id },
        });
        if (checkData.length) {
            successCode(res, checkData, "Lấy dữ liệu thành công");
        } else {
            failCode(res, "", "Không có dữ liệu");
        }
    } catch (error) {
        console.log("error: ", error);
        errorCode(res, "Lỗi sever");
    }
};
module.exports = { getImages, uploadImage, deleteImage, getImgByID };
