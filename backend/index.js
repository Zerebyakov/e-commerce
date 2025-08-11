import express from 'express'
import cors from 'cors'
import UserRoute from './routes/UserRoute.js'
import ProductRoute from './routes/ProductRoute.js'
import CategoryRoute from './routes/CategoryRoute.js'
import AuthRoute from './routes/AuthRoute.js'
import dotenv from 'dotenv'
import session from 'express-session'
import SequelizeStore from 'connect-session-sequelize'
import db from './config/Database.js'


import CartRoute from './routes/CartRoute.js'
import TransactionRoute from './routes/TransactionRoute.js'
import TransactionItemsRoute from './routes/TransactionItemsRoutes.js'



dotenv.config();


const app = express()
const sessionStore = SequelizeStore(session.Store)
const store = new sessionStore({
    db:db
});


app.use(session({
    secret: process.env.SESS_SECRET,
    resave: false,
    saveUninitialized: false,
    store:store,
    cookie:{
        secure: false
    }
}))
app.use(cors({
    credentials: true,
    origin: 'http://localhost:5173'
}))

app.use(express.json())
app.use(UserRoute)
app.use(ProductRoute)
app.use(CategoryRoute)
app.use(AuthRoute)
app.use( CartRoute)
app.use(TransactionRoute)
app.use("/transaction-items",TransactionItemsRoute)

app.listen(process.env.APP_PORT, ()=>{
    console.log('Server up and running!!')
})