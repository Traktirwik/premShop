import DataTypes from "sequelize";
import sequelize from "../db/dbInstance.js";
import Premium from "./premium.model.js";


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
    {
        hooks: {
            afterCreate(res) {
                console.log(res.name, "AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA")
                if(res.premium == true) {
                    try {
                        Premium.create({
                            name: res.name,
                            price: res.price,
                            image: res.image,
                            wheeled: res.wheeled,
                            nation: res.nation,
                            premium: res.premium,
                            tier: res.tier,
                            type: res.type,
                            description: res.description,
                            ItemId: res.id
                        })
                    } catch(error) {
                        console.log(error)
                        throw error
                    }
                   
                }  
            },
            afterBulkUpdate(res) { 
                const bodyObject = {...res}
                Items.findByPk(res.where.id).then(val => {
                    Premium.findOne({where: {ItemId: res.where.id}}).then(item => {
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
                                    ItemId: bodyObject.where.id
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
                                            ItemId: res.where.id
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
                                            ItemId: res.where.id,
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
                try{
                    Premium.destroy({
                        where:{
                            ItemId: res.where.id
                        }
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
);
Items.hasMany(Premium)



export default Items;