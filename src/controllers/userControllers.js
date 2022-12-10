const { successCode, failCode, errorCode } = require("../config/reponse");
const sequelize = require("../models/index");
const init_models = require("../models/init-models");
const bcrypt = require("bcrypt");
const { parseToken } = require("../middlewares/baseToken");
const db_host = require("../config/index");
const models = init_models(sequelize);
const getUser = async (req, res) => {
    try {
        console.log(db_host);
        let data = await models.users.findAll();
        successCode(res, data, "Lấy dữ liệu thành công");
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
        false;
        let { email, pass_word } = req.body;
        let checkLogin = await models.users.findOne({
            where: { email },
        });
        if (checkLogin) {
            let checkPass = bcrypt.compareSync(pass_word, checkLogin.pass_word);
            if (checkPass) {
                successCode(
                    res,
                    "",
                    parseToken(pass_word),
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
        let { email, pass_word, full_name, age, avatar } = req.body;
        let passWordHash = bcrypt.hashSync(pass_word, 10);
        let checkData = await models.users.findOne({
            where: { user_id },
        });
        if (checkData && checkData.email !== email) {
            let checkEmail = await models.users.findOne({ where: { email } });
            if (checkEmail) {
                failCode(res, "", "Email đã đăng kí");
                return;
            }
        }
        if (checkData) {
            let data = await models.users.update(
                {
                    pass_word: passWordHash,
                    full_name,
                    age,
                    email,
                    avatar,
                },
                { where: { user_id } }
            );
            successCode(res, data, "Tài khoản của bạn đã được cập nhật");
        } else {
            failCode(res, "", "Tài khoản không tồn tại");
        }
    } catch (error) {
        errorCode(res, "Lỗi sever");
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
        errorCode(res, "Lỗi sever");
    }
};
const avatarUser = async (req, res) => {
    const fs = require("fs");
    try {
        let { user_id } = req.params;
        let { filename } = req.file;
        let checkData = await models.users.findOne({
            where: { user_id },
        });
        if (checkData) {
            let { avatar: delete_avatar } = checkData.dataValues;
            if (delete_avatar) {
                setTimeout(() => {
                    fs.unlinkSync(
                        process.cwd() + "/public/avatar/" + delete_avatar
                    );
                }, 5000);
            }
            let data = await models.users.update(
                { avatar: filename },
                { where: { user_id } }
            );
            successCode(res, data, "update");
        } else {
            failCode(res, "", "Tài khoản không tồn tại");
        }
    } catch (error) {
        errorCode(res, "Lỗi sever");
    }
};
module.exports = { getUser, singUp, login, editUser, deleteUser, avatarUser };
