const sequelize = require("../models/index");
const init_models = require("../models/init-models");
const models = init_models(sequelize);
const getUser = async (req, res) => {
    try {
        let data = await models.users.findAll();
        res.send(data);
    } catch (error) {
        console.log("error: ", error);
    }
};
module.exports = { getUser };
