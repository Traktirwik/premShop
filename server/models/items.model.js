import DataTypes from "sequelize";
import sequelize from "../db/dbInstance.js";

const Items = sequelize.define(
    "Items",
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
            allowNull: false,
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        price: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        image: {
            type: DataTypes.JSON,
        },
        wheeled: {
            type: DataTypes.BOOLEAN
        },
        nation: {
            type: DataTypes.STRING
        },
        premium: {
            type: DataTypes.BOOLEAN
        },
        tier: {
            type: DataTypes.INTEGER
        },
        type: {
            type: DataTypes.STRING
        },
        description: {
            type: DataTypes.TEXT('long')
        }

    },
    sequelize
        .sync()
        .then((result) => {
            // console.log(result);
        })
        .catch((err) => console.log(err))
);
export default Items;