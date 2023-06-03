const express = require("express")
const connection = require("../config/db")
const { UserModel } = require("../Models/User.model")
const jwt = require("jsonwebtoken")
const bcrypt = require("bcrypt")

require("dotenv").config()

const UserRouter = express.Router()
UserRouter.use(express.json())

UserRouter.post("/register", (req, res) => {
    let {  email, password } = req.body
    try {
        bcrypt.hash(password, 5, async (err, hash) => {
            if (err) {
                res.send(err)
            }
            else {
                const data = new UserModel({email, password: hash })
                await data.save()
                res.status(201).send({"message":"SignUp successfull",data})
            }
        })
    } catch (error) {
        res, send(error)
    }
})

UserRouter.post("/login", async (req, res) => {
    const { email, password } = req.body;
    let userAvail = await UserModel.find({ email })
    console.log(userAvail)
    if (userAvail.length > 0) {
        try {
            bcrypt.compare(password, userAvail[0].password, async (err, result) => {
                if(result==true){
                let token = jwt.sign({ UserId: userAvail[0]._id }, process.env.secretKey)
                res.status(201).send({ "message": "Login Successful", token })
            }
            else if(result==false){
                    res.status(404).send({ "message": "Invalid Credentials" })
                }
            })
        } catch (error) {
            res.send(error)
        }
    }
    else {
        res.status(404).send({"message":"User not found  , Please Signup first"})
    }
})

UserRouter.get("/", async (req, res) => {
    const data = await UserModel.find()
    res.send(data)
})

module.exports = {
    UserRouter
}