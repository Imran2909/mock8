const express = require("express")
const connection = require("../config/db")
const { ProductModel } = require("../Models/Product.model")

require("dotenv").config()

const ProductRouter = express.Router()
ProductRouter.use(express.json())

ProductRouter.post("/add",async (req, res) => {
    let body = req.body
        const data = new ProductModel(body)
        await data.save()
        res.status(201).send({ "message": "Product Added", data })
})

ProductRouter.get("/all", async (req, res) => {
    const data = await ProductModel.find()
    res.send({data})
})

ProductRouter.get("/:id",async(req,res)=>{
    let ID= req.params.id
    // res.send(ID)
    try {
        const data = await ProductModel.find({category:ID})
        res.send(data)
    } catch (error) {
        res.send(error)
    }
})

ProductRouter.delete("/:id",async(req,res)=>{
    let ID= req.params.id
    let val= await ProductModel.find({description:ID})
    // let id=
    res.send(val[0]._id)
    try {
        await ProductModel.findByIdAndDelete({_id:val[0]._id})
        // ProductModel.findByIdAndDelete
        res.send("Product Deleted ")
    } catch (error) {
        res.send(error)
    }
})

module.exports = {
    ProductRouter
}