import { Sequelize } from "sequelize";
import db from "../config/Database.js";
import Users from "./Users.js";


const {DataTypes} = Sequelize;

const Transaction = db.define('transaction',{
    user_id:{
        type: DataTypes.INTEGER,
        allowNull:false
    },
    total_price:{
        type:DataTypes.DECIMAL(15,2),
        allowNull:false
    },
    status:{
        type: DataTypes.ENUM(
            'pending',
            'paid',
            'candelled'
        ),
        defaultValue: 'pending'
    },
    payment_method:{
        type: DataTypes.STRING,
        allowNull: false
    }
},{
    freezeTableName: true
})


Users.hasMany(Transaction, {foreignKey:'user_id'})
Transaction.belongsTo(Users,{foreignKey:'user_Id'})

export default Transaction;



(async()=>{
    await db.sync();
})()