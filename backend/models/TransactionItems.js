import { Sequelize } from "sequelize";
import db from "../config/Database.js";
import Transaction from "./Transaction.js";
import Products from "./Products.js";


const {DataTypes} = Sequelize;

const TransactionItems = db.define('transaction_items',{
    transaction_id:{
        type:DataTypes.INTEGER,
        allowNull: false
    },
    product_id:{
        type: DataTypes.INTEGER,
        allowNull: false
    },
    quantity:{
        type: DataTypes.INTEGER,
        allowNull: false
    },
    price_at_purchase:{
        type: DataTypes.DECIMAL(15,2),
        allowNull:false
    }
},{
    freezeTableName: true
})

Transaction.hasMany(TransactionItems,{foreignKey:'transaction_id'})
TransactionItems.belongsTo(Transaction, {foreignKey:'transaction_id'})

Products.hasMany(TransactionItems, {foreignKey:'product_id'})
TransactionItems.belongsTo(Products,{foreignKey:'product_id'})


export default TransactionItems;


(async()=>{
    await db.sync();
})()