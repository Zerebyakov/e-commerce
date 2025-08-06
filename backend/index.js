import express from 'express'
import cors from 'cors'
import UserRoute from './routes/UserRoute.js'
import ProductRoute from './routes/ProductRoute.js'
import CategoryRoute from './routes/CategoryRoute.js'
import dotenv from 'dotenv'

dotenv.config();

const app = express()
app.use(express.json())
app.use(cors())
app.use(UserRoute)
app.use(ProductRoute)
app.use(CategoryRoute)


app.listen(process.env.APP_PORT, ()=>{
    console.log('Server up and running!!')
})