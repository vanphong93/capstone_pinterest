const { successCode, failCode, errorCode } = require("../config/reponse");
const sequelize = require("../models/index");
const init_models = require("../models/init-models");
const models = init_models(sequelize);
const getComment = async (req, res) => {
    try {
        let data = await models.comments.findAll();
        successCode(res, data, "Lấy dữ liệu thành công");
    } catch (error) {
        errorCode(res, "Lỗi sever");
    }
};
const getCommentByImg = async (req, res) => {
    try {
        let { id: image_id } = req.params;
        let data = await models.comments.findAll({
            where: { image_id },
            include: [
                {
                    model: models.users,
                    as: "user",
                    attributes: ["full_name", "avatar"],
                },
            ],
        });
        successCode(res, data, "Lấy dữ liệu thành công");
    } catch (error) {
        errorCode(res, "Lỗi sever");
    }
};
const deleteComment = async (req, res) => {
    try {
        let { id: comment_id } = req.params;
        let data = await models.comments.destroy({
            where: { comment_id },
        });
        if (data) {
            successCode(res, data, "Xóa thành công");
        } else {
            failCode(res, data, "Không tồn tại");
        }
    } catch (error) {
        errorCode(res, "Lỗi sever");
    }
};
const createCommnet = async (req, res) => {
    try {
        let { user_id, image_id, content } = req.body;
        let checkUser = await models.users.findOne({ where: { user_id } });
        let checkImage = await models.images.findOne({ where: { image_id } });
        if (checkUser && checkImage) {
            let data = await models.comments.create({
                user_id,
                image_id,
                content,
                comment_date: new Date(),
            });
            successCode(res, data, "Thành công");
        } else if (!checkUser && !checkImage) {
            failCode(res, "", "kiểm tra User,Image tồn tại");
        } else if (!checkUser) {
            failCode(res, "", "kiểm tra User tồn tại");
        } else {
            failCode(res, "", "kiểm tra Image tồn tại");
        }
    } catch (error) {
        errorCode(res, "Lỗi sever");
    }
};

module.exports = { getComment, getCommentByImg, deleteComment, createCommnet };
