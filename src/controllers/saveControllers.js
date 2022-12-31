const { successCode, failCode, errorCode } = require("../config/reponse");
const sequelize = require("../models/index");
const init_models = require("../models/init-models");
const models = init_models(sequelize);
const createSave = async (req, res) => {
    try {
        let { user_id, image_id } = req.body;
        let checkDulicate = await models.image_save.findOne({
            where: { user_id, image_id },
        });
        let save_day = new Date();
        if (checkDulicate) {
            failCode(res, "", "Ảnh đã save");
        } else {
            let data = await models.image_save.create({
                user_id,
                image_id,
                save_day,
            });
            successCode(res, data, "thành công");
        }
    } catch (error) {

        errorCode(res, "Lỗi sever,kiểm tra id tồn tại");
    }
};
const getSaveById = async (req, res) => {
    try {
        let { id: user_id } = req.params;
        let data = await models.image_save.findAll({
            where: { user_id },
            include: ["image"],
        });
        if (data.length > 0) {
            successCode(res, data, "thành công");
        } else {
            failCode(res, "", "Không có dữ liệu");
        }
    } catch (error) {

        errorCode(res, "Lỗi sever");
    }
};
const deleteSave = async (req, res) => {
    try {
        let { user_id, image_id } = req.params;
        let data = await models.image_save.destroy({
            where: { user_id, image_id },
        });
        if (data) {
            successCode(res, data, "thành công");
        } else {
            failCode(res, "", "Không có dữ liệu,kiểm tra Id tồn tại");
        }
    } catch (error) {

        errorCode(res, "Lỗi sever");
    }
};
module.exports = { createSave, getSaveById, deleteSave };
