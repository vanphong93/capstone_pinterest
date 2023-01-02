const jwt = require("jsonwebtoken");
const parseToken = (data) => {
    let token = jwt.sign({ data }, "cyber", {
        algorithm: "HS256",
        expiresIn: "30d",
    });
    return token;
};
const checkToken = (token) => {
    try {
        let decode = jwt.verify(token, "cyber");
        if (decode) {
            return { checkData: true, message: "" };
        } else {
            return { checkData: false, message: "Token không hợp lệ" };
        }
    } catch (error) {
        return { checkData: false, message: error.message };
    }
};
const verifyToken = (req, res, next) => {
    let { token } = req.headers;
    const verifyToken = checkToken(token);
    if (verifyToken.checkData) {
        next();
    } else {
        res.status(401).send(verifyToken.message);
    }
};
module.exports = { verifyToken, checkToken, parseToken, jwt };
