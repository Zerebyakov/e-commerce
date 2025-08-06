import { Sequelize } from "sequelize";
import db from "../config/Database.js";


const {DataTypes} = Sequelize;
const Category = db.define('category',{
    name:{
        type:DataTypes.STRING
    },
    description:{
        type: DataTypes.STRING
    }
},{
    freezeTableName:true,
    timestamps:false,
    createdAt: false,
    updatedAt: false
})

export default Category;


(async()=>{
    await db.sync();
})()