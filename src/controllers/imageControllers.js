const { successCode, failCode, errorCode } = require("../config/reponse");
const sequelize = require("../models/index");
const init_models = require("../models/init-models");
const models = init_models(sequelize);
const fs = require("fs");
const { Op, where } = require("sequelize");
const getImages = async (req, res) => {
    try {
        let data = await models.images.findAll();
        successCode(res, data, "Lấy dữ liệu thành công");
    } catch (error) {
        errorCode(res, "Lỗi sever");
    }
};
const searchImg = async (req, res) => {
    try {
        let { name } = req.query;
        let data = await models.images.findAll({
            where: { image_name: { [Op.like]: `%${name}%` } },
        });
        successCode(res, data, "Lấy dữ liệu thành công");
    } catch (error) {
        errorCode(res, "Lỗi sever");
    }
};
const uploadImage = async (req, res) => {
    try {
        let { filename, image_name, description, user_id } = {
            ...req.body,
            ...req.file,
        };
        let checkId = await models.users.findOne({ where: { user_id } });

        if (checkId) {
            let data_created = new Date();
            let fullUrl =
                req.protocol +
                "://" +
                req.get("host") +
                req.originalUrl +
                "/" +
                filename;
            let data = await models.images.create({
                image_name,
                description,
                data_created,
                user_id,
                URL: fullUrl,
            });
            successCode(res, data, "success");
        } else {
            errorCode(res, "Id không tồn tại");
        }
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
            let splitURL =
                req.protocol +
                "://" +
                req.get("host") +
                "/api/image-management/upload/";
            URL = URL.replace(splitURL, "");
            setTimeout(() => {
                fs.unlink(process.cwd() + "/public/img/" + URL, (err) => {
                    return;
                });
            }, 5000);
            models.images
                .destroy({ where: { image_id } })
                .then(() => {
                    successCode(res, "", "Xóa thành công");
                })
                .catch(() => {
                    failCode(
                        res,
                        "",
                        "Ảnh không thể xóa do có bình luận hoặc được người khác lưu"
                    );
                });
        } else {
            failCode(res, "", "Ảnh không tồn tại");
        }
    } catch (error) {
        errorCode(res, "Lỗi sever");
    }
};
const getImgByImgID = async (req, res) => {
    try {
        let { id: image_id } = req.params;
        let data = await models.images.findOne({
            where: { image_id },
            include: [
                {
                    model: models.users,
                    as: "user",
                    attributes: { exclude: "pass_word" },
                },
            ],
        });
        if (!data) {
            failCode(res, "", "Image không tồn tại");
            return;
        } else {
            successCode(res, data, "Lấy dữ liệu thành công");
        }
    } catch (error) {
        errorCode(res, "Lỗi sever");
    }
};
const getImgByUserId = async (req, res) => {
    try {
        let { id: user_id } = req.params;
        let data = await models.images.findAll({
            where: { user_id },
        });
        if (data.length > 0) {
            successCode(res, data, "Lấy dữ liệu thành công");
        } else {
            failCode(res, "", "Không có dữ liệu");
        }
    } catch (error) {
        errorCode(res, "Lỗi sever");
    }
};
module.exports = {
    getImages,
    uploadImage,
    deleteImage,
    getImgByImgID,
    getImgByUserId,
    searchImg,
};
