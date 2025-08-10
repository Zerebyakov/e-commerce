import { Sequelize } from "sequelize";
import db from "../config/Database.js";
import Users from "./Users.js";
import Products from "./Products.js";

const {DataTypes} =Sequelize;

const Cart = db.define('cart',{
    user_id:{
        type: DataTypes.INTEGER,
        allowNull: false
    },
    product_id:{
        type: DataTypes.INTEGER,
        allowNull:false
    },
    quantity:{
        type:DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 1
    }
},{
    freezeTableName:true
})


Users.hasMany(Cart, {foreignKey:'user_id'})
Cart.belongsTo(Users, {foreignKey:'user_id'})


Products.hasMany(Cart, {foreignKey:'product_id'})
Cart.belongsTo(Products, {foreignKey:'product_id'})



export default Cart;

(async()=>{
    await db.sync();
})()