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
        description: {
            type: DataTypes.TEXT('long')
        },
    },
    {
        hooks: {
            afterCreate(res) {
                try {
                    console.log(res.id, "ASDASDASDASDASDASD")
                    Items.create({
                        name: res.name,
                        price: res.price,
                        image: res.image,
                        premium: res.premium,
                        description: res.description,
                    }).then(async (val) => {
                        console.log(val.id, "::::::::::::::::::::::")
                        await gameCurrency.update({ItemId: val.id}, {where: {id: res.id}})
                    })
                } catch (error) {
                    console.log(error)
                    throw error
                }
            },
            afterBulkUpdate(res) { 
                if(res.attributes.ItemId) {
                    return
                }
                const bodyObject = {...res}
        
                gameCurrency.findByPk(res.where.id).then(async(val) => {
                
                    await Items.update(bodyObject.attributes, {where: {id: val.ItemId }})
                    
                    Premium.findOne({where: {currencyId: res.where.id}}).then(item => {
                        if(!item && val.premium == true) {
                            try {
                                Premium.create({
                                    name: bodyObject.attributes.name,
                                    price: bodyObject.attributes.price,
                                    image: bodyObject.attributes.image,
                                    wheeled: bodyObject.attributes.wheeled,
                                    nation: bodyObject.attributes.nation,
                                    premium: bodyObject.attributes.premium,
                                    tier: bodyObject.attributes.tier,
                                    type: bodyObject.attributes.type,
                                    description: bodyObject.attributes.description,
                                    currencyId: bodyObject.where.id
                                })
                            } catch(error) {
                                console.log(error)
                                throw error
                            }
                        } else if(!item && val.premium == false) {
                            return
                        } else {
                            if(val.premium == false) {
                                try {
                                    Premium.destroy({
                                        where: {
                                            currencyId: res.where.id
                                        }
                                    })
                                } catch(error) {
                                    console.log(error)
                                    throw(error)
                                }
                            } else {
                                try{
                                    Premium.update(bodyObject.attributes, {
                                        where: {
                                            currencyId: res.where.id,
                                        }
                                    })
                                } catch(error) {
                                    console.log(error)
                                    throw error
                                }
                            }
                        }
                    })
                  
                })    
            },
            beforeBulkDestroy(res) {
                console.log(res, "PPPPPPPPPPPPPPPPPPPPPPPPPPPPPPP")
                try{
                    Premium.destroy({
                        where:{
                            currencyId: res.where.id
                        }
                    }).then(async(response) => {
                        await gameCurrency.findByPk(res.where.id).then(async(val) => {
                            await Items.destroy({
                                where: {
                                    id: val.ItemId
                                }
                            })
                        })
                    })
                } catch(error) {
                    console.log(error)
                    throw error
                }
            }
            
        }
    },
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