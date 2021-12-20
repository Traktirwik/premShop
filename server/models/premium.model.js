import DataTypes from "sequelize";
import sequelize from "../db/dbInstance.js";

const Premium = sequelize.define(
    "Premium",
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
            unique: true,
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
)

export default Premium;

