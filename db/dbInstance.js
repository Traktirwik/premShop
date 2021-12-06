import { Sequelize } from 'sequelize';

const sequelize = new Sequelize({
    dialect: 'mysql',
    host: 'localhost',
    database: 'testPremShop',
    username: 'root',
    password: 'Ignatik1002'
})

async function checkConnection() {
    try {
        await sequelize.authenticate();
        console.log('Connection has been established successfully.');
      } catch (error) {
        console.error('Unable to connect to the database:', error);
      }
}

checkConnection()

export default sequelize;



// const Users = sequelize.define('Users', {
//     id: {
//         type: DataTypes.INTEGER,
//         autoIncrement: true,
//         primaryKey: true,
//         allowNull: false
//       },
//     email: {
//         type: DataTypes.STRING,
//         allowNull: false
//     }, 
//     password: {
//         type: DataTypes.STRING,
//         allowNull: false
//     }
    
    
// },
//     sequelize.sync().then(result=>{
//         console.log(result);
//     })
//     .catch(err=> console.log(err))
// )

// async function addNewUser() {
//     const Ignat = await Users.create({
//         email: "ignatmustafin77@gmail.com",
//         password: "Ignatik1002"
//     })
// }

// addNewUser()
