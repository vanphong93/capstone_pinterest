const jwt = require("jsonwebtoken");
const parseToken = (data) => {
    let token = jwt.sign({ data }, "cyber", {
        algorithm: "HS256",
        expiresIn: "1y",
    });
    return token;
};
const checkToken = (token) => {
    try {
        let decode = jwt.verify(token, "cyber");
        if (decode) {
            return { checkData: true, messagse: "" };
        } else {
            return { checkData: false, messagse: "Token không hợp lệ" };
        }
    } catch (error) {
        return { checkData: false, messagse: error.message };
    }
};
const verifyToken = (req, res, next) => {
    let { token } = req.headers;
    const verifyToken = checkToken(token);
    if (verifyToken.checkData) {
        next();
    } else {
        res.status(401).send(verifyToken.messagse);
    }
    // next();
};
module.exports = { verifyToken, checkToken, parseToken, jwt };
