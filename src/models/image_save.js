const Sequelize = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  return image_save.init(sequelize, DataTypes);
}

class image_save extends Sequelize.Model {
  static init(sequelize, DataTypes) {
  return super.init({
    save_day: {
      type: DataTypes.DATEONLY,
      allowNull: true
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'users',
        key: 'user_id'
      }
    },
    image_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'images',
        key: 'image_id'
      }
    }
  }, {
    sequelize,
    tableName: 'image_save',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "image_id" },
          { name: "user_id" },
        ]
      },
      {
        name: "user_id",
        using: "BTREE",
        fields: [
          { name: "user_id" },
        ]
      },
    ]
  });
  }
}
