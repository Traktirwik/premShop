import DataTypes from "sequelize";
import sequelize from "../db/dbInstance.js";

const Users = sequelize.define(
  "Users",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    role: {
      type: DataTypes.JSON,
      defaultValue: { role: ["USER"] },
    },
    username: {
      type: DataTypes.JSON,
      allowNull: false
    },
    photo: {
      type: DataTypes.STRING
    },
    favorite: {
      type: DataTypes.JSON,
      defaultValue: {id: []},
    },
    cart: {
      type: DataTypes.JSON,
      defaultValue: {id: []}
    }
  },
  sequelize
    .sync()
    .then((result) => {
      // console.log(result);
    })
    .catch((err) => console.log(err))
);


export default Users;
