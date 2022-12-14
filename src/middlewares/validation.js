const types = ["image/png", "image/jpeg", "image/png"];
const isEmpty = (object) => {
    for (const key in object) {
        if (!object[key]) {
            return true;
        }
    }
    return false;
};
const validation = {
    emptyLogin: (req, res, next) => {
        let { email, pass_word } = req.body;
        if (isEmpty({ email, pass_word })) {
            res.status(401).send({ message: "Kiểm tra dữ liệu trống" });
        } else {
            next();
        }
    },
    emptySign: (req, res, next) => {
        let { email, pass_word, full_name, age } = req.body;
        if (isEmpty({ email, pass_word, full_name, age })) {
            res.status(401).send({ message: "Kiểm tra dữ liệu trống" });
        } else {
            next();
        }
    },
    emptyUpload: (req, res, next) => {
        let { filename, image_name, description, user_id } = {
            ...req.body,
            ...req.file,
        };
        if (isEmpty({ filename, image_name, description, user_id })) {
            res.status(401).send({ message: "Kiểm tra dữ liệu trống" });
        } else {
            next();
        }
    },
    emptyComment: (req, res, next) => {
        let { user_id, image_id, content } = req.body;
        if (isEmpty({ user_id, image_id, content })) {
            res.status(401).send({ message: "Kiểm tra dữ liệu trống" });
        } else {
            next();
        }
    },
    sizeAndType: (req, res, next) => {
        let { mimetype, size } = req.file;
        if (types.includes(mimetype)) {
            if (size > 51200000) {
                res.status(401).send({ message: "Kích thước ảnh nhỏ hơn 5mb" });
            } else {
                next();
            }
        } else {
            res.status(401).send({ message: "Kiểu dữ liệu jpg png jpeg" });
        }
    },
};
module.exports = { validation };
