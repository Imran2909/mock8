const express = require("express")
const jwt = require("jsonwebtoken")
const cors = require('cors')
const { connection } = require("./config/db")
const { UserRouter } = require("./Routes/User.Route")
const { ProductRouter } = require("./Routes/Product.Route")
const { Authenticate } = require("./Middleware/Authenticate")

const app = express()

app.use(express.json())
app.use(cors())

app.get("/", (req, res) => {
    res.send("home route")
})

app.use("/user", UserRouter)

app.use(Authenticate)

app.use("/product", ProductRouter)

app.listen(2020, async () => {
    try {
        await connection
        console.log("Connected to DB")
    } catch (error) {
        console.log(error)
    }
    console.log("Port 2020")
})