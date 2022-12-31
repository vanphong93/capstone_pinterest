const { successCode, failCode, errorCode } = require("../config/reponse");
const sequelize = require("../models/index");
const init_models = require("../models/init-models");
const bcrypt = require("bcrypt");
const { parseToken } = require("../middlewares/baseToken");
const models = init_models(sequelize);
const getUser = async (req, res) => {
    try {
        let data = await models.users.findAll();
        successCode(res, data, "Lấy dữ liệu thành công");
    } catch (error) {
        errorCode(res, "Lỗi sever");
    }
};
const getUserById = async (req, res) => {
    try {
        let { id: user_id } = req.params;
        console.log("user_id: ", user_id);
        let data = await models.users.findOne({ where: { user_id } });
        if (data) {
            successCode(res, data, "Lấy dữ liệu thành công");
        } else {
            failCode(res, "", "Tài khoản không tồn tại");
        }
    } catch (error) {
        errorCode(res, "Lỗi sever");
    }
};
const singUp = async (req, res) => {
    try {
        let { email, pass_word, full_name, age, avatar } = req.body;
        let passWordHash = bcrypt.hashSync(pass_word, 10);
        let checkData = await models.users.findOne({
            where: { email },
        });
        if (checkData) {
            failCode(res, "", "Email đã tồn tại");
        } else {
            let data = await models.users.create({
                email,
                pass_word: passWordHash,
                full_name,
                age,
                avatar,
            });
            successCode(res, data, "Đăng kí thành công");
        }
    } catch (error) {
        errorCode(res, "Lỗi sever");
    }
};
const login = async (req, res) => {
    try {
        let { email, pass_word } = req.body;
        let checkLogin = await models.users.findOne({
            where: { email },
        });
        if (checkLogin) {
            let checkPass = bcrypt.compareSync(pass_word, checkLogin.pass_word);
            if (checkPass) {
                successCode(
                    res,
                    {
                        user_id: checkLogin.user_id,
                        token: parseToken(pass_word),
                    },
                    "Đăng nhập thành công"
                );
            } else {
                failCode(res, "", "Pass word không đúng");
            }
        } else {
            failCode(res, "", "Tài khoản không tồn tại");
        }
    } catch (error) {
        errorCode(res, "Lỗi sever");
    }
};
const editUser = async (req, res) => {
    try {
        let { id: user_id } = req.params;
        let fixData = req.body;
        //remote undefined value
        for (const key in fixData) {
            if (!fixData[key]) {
                delete fixData[key];
            }
        }
        //cover pass word
        if (fixData.pass_word) {
            fixData.pass_word = bcrypt.hashSync(fixData.pass_word, 10);
        }
        let checkData = await models.users.findOne({
            where: { user_id },
        });
        if (fixData.email) {
            let { email } = fixData;
            if (checkData && checkData.email !== email) {
                let checkEmail = await models.users.findOne({
                    where: { email },
                });
                if (checkEmail) {
                    failCode(res, "", "Email đã đăng kí");
                    return;
                }
            }
        }
        if (checkData) {
            let data = await models.users.update(fixData, {
                where: { user_id },
            });
            successCode(res, data, "Tài khoản của bạn đã được cập nhật");
        } else {
            failCode(res, "", "Tài khoản không tồn tại");
        }
    } catch (error) {
        errorCode(res, error);
    }
};
const deleteUser = async (req, res) => {
    try {
        let { id: user_id } = req.params;
        let checkData = await models.users.findOne({
            where: { user_id },
        });
        if (checkData) {
            let data = await models.users.destroy({ where: { user_id } });
            successCode(res, data, "Xóa thành công");
        } else {
            failCode(res, "", "Tài khoản không tồn tại");
        }
    } catch (error) {
        errorCode(res, "Không thể xóa hoặc lỗi sever");
    }
};
const avatarUser = async (req, res) => {
    const fs = require("fs");
    try {
        let { id: user_id } = req.params;
        let { filename } = req.file;
        let Url =
            req.protocol + "://" + req.get("host") + req.originalUrl + "/";
        let fullUrl = Url + filename;
        let checkData = await models.users.findOne({
            where: { user_id },
        });
        if (checkData) {
            let { avatar: delete_avatar } = checkData.dataValues;
            if (delete_avatar) {
                delete_avatar = delete_avatar.replace(Url, "");
                setTimeout(() => {
                    fs.unlinkSync(
                        process.cwd() + "/public/avatar/" + delete_avatar
                    );
                }, 5000);
            }
            let data = await models.users.update(
                { avatar: fullUrl },
                { where: { user_id } }
            );
            successCode(res, data, "update");
        } else {
            failCode(res, "", "Tài khoản không tồn tại");
            fs.unlinkSync(process.cwd() + "/public/avatar/" + filename);
        }
    } catch (error) {
        errorCode(res, "lỗi");
    }
};
module.exports = {
    getUser,
    getUserById,
    singUp,
    login,
    editUser,
    deleteUser,
    avatarUser,
};
