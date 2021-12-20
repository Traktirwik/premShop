import DataTypes from "sequelize";
import sequelize from "../db/dbInstance.js";
import Premium from "./premium.model.js";
import Items from "./items.model.js"

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
        type: {
            type: DataTypes.STRING
        },
        description: {
            type: DataTypes.TEXT('long')
        },
    },
    // {
        // hooks: {
            
        //     beforeBulkDestroy(res) {
        //         console.log(res, "PPPPPPPPPPPPPPPPPPPPPPPPPPPPPPP")
        //         try{
        //             Premium.destroy({
        //                 where:{
        //                     currencyId: res.where.id
        //                 }
        //             }).then(async(response) => {
        //                 await gameCurrency.findByPk(res.where.id).then(async(val) => {
        //                     await Items.destroy({
        //                         where: {
        //                             id: val.ItemId
        //                         }
        //                     })
        //                 })
        //             })
        //         } catch(error) {
        //             console.log(error)
        //             throw error
        //         }
        //     }
            
        // }
    // },
    sequelize
        .sync()
        .then((result) => {
            // console.log(result);
        })
        .catch((err) => console.log(err))
)
gameCurrency.hasMany(Premium)
gameCurrency.belongsTo(Items)

export default gameCurrency;