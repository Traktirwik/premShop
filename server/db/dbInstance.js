import { Sequelize } from 'sequelize';

const sequelize = new Sequelize({
  dialect: 'mysql',
  host: 'localhost',
  database: 'testPremShop',
  port: 3306,
  username: 'root',
  password: 'Ignatik1002'
})

async function checkConnection() {
  try {
    await sequelize.authenticate();
    // console.log('Connection has been established successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
}

checkConnection()

export default sequelize;