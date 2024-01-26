import { Sequelize, DataTypes } from "sequelize";
import sequelize from "../config/db";

const User = sequelize.define("users", {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    allowNull: false,
    primaryKey: true,
  },
  fullName: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  email: {
    type: Sequelize.STRING,
    allowNull: true,
    unique: true,
  },
  password: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  salt: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  // tfa_enabled: {
  //   type: Sequelize.BOOLEAN,
  //   allowNull: false,
  //   defaultValue: false,
  // },
  role: {
    type: DataTypes.ENUM("DEVELOPER", "CLIENT"),
    defaultValue: "STUDENT",
  },
  // status: {
  //   type: DataTypes.ENUM("INACTIVE", "ACTIVE"),
  //   defaultValue: "ACTIVE",
  // },
});

export default User;
