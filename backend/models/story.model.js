const { DataTypes } = require("sequelize");
const {sequelize} = require("../config/db.js");
const Doctor = require("./doctor.model.js");

const Story = sequelize.define(
  "Story",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    user_name: {  // Match the column name in the DB
      type: DataTypes.STRING,
      allowNull: false,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    content: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    doctor_id: {  // Match the column name in the DB
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "doctors",
        key: "id",
      },
      onDelete: "CASCADE",
    },
  },
  {
    tableName: "stories",
    timestamps: true,
  }
);


// **Associations**
Doctor.hasMany(Story, { foreignKey: "doctorId" });
Story.belongsTo(Doctor, { foreignKey: "doctorId" });

module.exports = Story;
