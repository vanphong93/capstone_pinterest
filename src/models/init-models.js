const DataTypes = require("sequelize").DataTypes;
const _comments = require("./comments");
const _image_save = require("./image_save");
const _images = require("./images");
const _users = require("./users");

function initModels(sequelize) {
  const comments = _comments(sequelize, DataTypes);
  const image_save = _image_save(sequelize, DataTypes);
  const images = _images(sequelize, DataTypes);
  const users = _users(sequelize, DataTypes);

  images.belongsToMany(users, { as: 'user_id_users', through: image_save, foreignKey: "image_id", otherKey: "user_id" });
  users.belongsToMany(images, { as: 'image_id_images', through: image_save, foreignKey: "user_id", otherKey: "image_id" });
  comments.belongsTo(images, { as: "image", foreignKey: "image_id"});
  images.hasMany(comments, { as: "comments", foreignKey: "image_id"});
  image_save.belongsTo(images, { as: "image", foreignKey: "image_id"});
  images.hasMany(image_save, { as: "image_saves", foreignKey: "image_id"});
  comments.belongsTo(users, { as: "user", foreignKey: "user_id"});
  users.hasMany(comments, { as: "comments", foreignKey: "user_id"});
  image_save.belongsTo(users, { as: "user", foreignKey: "user_id"});
  users.hasMany(image_save, { as: "image_saves", foreignKey: "user_id"});
  images.belongsTo(users, { as: "user", foreignKey: "user_id"});
  users.hasMany(images, { as: "images", foreignKey: "user_id"});

  return {
    comments,
    image_save,
    images,
    users,
  };
}
module.exports = initModels;
module.exports.initModels = initModels;
module.exports.default = initModels;
