import express from "express";
import mongoose from "mongoose";
import cors from "cors"
import usersRouter from './routes/users.router.js'
import businessRouter from './routes/business.router.js'
import ordersRouter from './routes/orders.router.js'

const port = 8080

const app = express()


app.listen(port, () => {
    console.log(`Server running on port ${port}`)
})

const connection = mongoose.connect("")

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cors({ origin: 'http://localhost:5500', methods: ["GET", "POST", "PUT"] }))

//Routers
app.use('/api/usersRouter', usersRouter)
app.use("/api/business", businessRouter)
app.use("/api/orders", ordersRouter)