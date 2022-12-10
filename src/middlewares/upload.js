const multer = require("multer");
const storage = {
    uploadImages: () => {
        return multer.diskStorage({
            destination: (req, file, cb) => {
                cb(null, process.cwd() + "/public/img");
            },
            filename: (req, file, cb) => {
                const uniqueSufix = Date.now() + "_" + file.originalname;
                cb(null, uniqueSufix);
            },
        });
    },
    uploadAvatar: () => {
        return multer.diskStorage({
            destination: (req, file, cb) => {
                cb(null, process.cwd() + "/public/avatar");
            },
            filename: (req, file, cb) => {
                const uniqueSufix = Date.now() + "_" + file.originalname;
                cb(null, uniqueSufix);
            },
        });
    },
};
const upload = multer({ storage: storage.uploadImages() });
const avatar = multer({ storage: storage.uploadAvatar() });
module.exports = { upload ,avatar};
