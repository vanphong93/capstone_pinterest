const { successCode, failCode, errorCode } = require("../config/reponse");
const sequelize = require("../models/index");
const init_models = require("../models/init-models");
const bcrypt = require("bcrypt");
const { parseToken } = require("../middlewares/baseToken");
const db_host = require("../config/index");
const models = init_models(sequelize);
const getComment = async (req, res) => {
    try {
        let data = await models.comments.findAll();
        successCode(res, data, "Lấy dữ liệu thành công");
    } catch (error) {
        console.log("error: ", error);
        errorCode(res, "Lỗi sever");
    }
};
const getCommentByImg = async (req, res) => {
    try {
        let { id: image_id } = req.params;
        let data = await models.comments.findAll({
            where: { image_id },
        });
        if (data.length > 0) {
            successCode(res, data, "Lấy dữ liệu thành công");
        } else {
            failCode(res, data, "Không có dữ liệu");
        }
    } catch (error) {
        console.log("error: ", error);
        errorCode(res, "Lỗi sever");
    }
};
const deleteComment = async (req, res) => {
    try {
        let { user_id, image_id } = req.body;
        let data = await models.comments.destroy({
            where: { user_id, image_id },
        });
        if (data) {
            successCode(res, data, "Xóa thành công");
        } else {
            failCode(res, data, "Không tồn tại");
        }
    } catch (error) {
        console.log("error: ", error);
        errorCode(res, "Lỗi sever");
    }
};
const createCommnet = async (req, res) => {
    try {
        let { user_id, image_id, content, comment_date } = req.body;
        let data = await models.comments.create({
            user_id,
            image_id,
            content,
            comment_date,
        });

        successCode(res, data, "thành công");
    } catch (error) {
        console.log("error: ", error);
        errorCode(res, "Lỗi sever");
    }
};

module.exports = { getComment, getCommentByImg, deleteComment, createCommnet };
