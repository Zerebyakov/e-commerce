import { Sequelize } from "sequelize";


const db = new Sequelize('e_commerce','root','',{
    host: "localhost",
    dialect: "mysql"
})


export default db