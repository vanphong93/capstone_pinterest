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
        let data = await models.users.findOne({ where: { user_id } });
        data
            ? successCode(res, data, "Lấy dữ liệu thành công")
            : failCode(res, data, "Tài khoản không tồn tại");
    } catch (error) {
        errorCode(res, "Lỗi sever");
    }
};
const signUp = async (req, res) => {
    try {
        let { email, pass_word, full_name, age } = req.body;
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
                    return failCode(res, "", "Email đã đăng kí");
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
            models.users
                .destroy({ where: { user_id } })
                .then((result) => {
                    successCode(res, "", "Xóa thành công");
                })
                .catch((error) => {
                    failCode(res, "", "Tài không thể xóa do đã upload ảnh");
                });
        } else {
            failCode(res, "", "Tài khoản không tồn tại");
        }
    } catch (err) {
        errorCode(res, "Lỗi sever");
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
                    // fs.unlink(
                    //     process.cwd() + "/public/avatar/" + delete_avatar,
                    //     (err) => {
                    //         if (err) {
                    //             return;
                    //         }
                    //     }
                    // );
                    fs.unlinkSync(
                        process.cwd() + "/public/avatar/" + delete_avatar
                    );
                }, 5000);
            }
            let data = await models.users.update(
                { avatar: fullUrl },
                { where: { user_id } }
            );

            data && successCode(res, fullUrl, "update");
        } else {
            failCode(res, "", "Tài khoản không tồn tại");
            fs.unlinkSync(process.cwd() + "/public/avatar/" + filename);
        }
    } catch (error) {
        errorCode(res, "lỗi sever");
    }
};
module.exports = {
    getUser,
    getUserById,
    signUp,
    login,
    editUser,
    deleteUser,
    avatarUser,
};
