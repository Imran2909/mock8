const { connection } = require("../config/db")
const mongoose = require("mongoose")
const ProductSchema = mongoose.Schema({
    name: { type: String, required: true },
    description: { type: String, required: true },
    category: { type: String, required: true },
    imageURL: { type: String, required: true },
    location: { type: String, required: true },
    date: { type: Date, required: true },
    price: { type: Number, required: true }
}, {
    versionKey: false
})
const ProductModel = mongoose.model("Product", ProductSchema)
module.exports = {
    ProductModel
}