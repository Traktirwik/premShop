import DataTypes from "sequelize";
import sequelize from "../db/dbInstance.js";

const gameCurrency = sequelize.define(
    "currency",
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
        premium: {
            type: DataTypes.BOOLEAN
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
export default gameCurrency;