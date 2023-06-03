const { connection } = require("../config/db")
const mongoose = require("mongoose")
const UserSchema = mongoose.Schema({
    email: { type: String, required: true },
    password: { type: String, required: true }
}, {
    versionKey: false
})
const UserModel = mongoose.model("User", UserSchema)
module.exports = {
    UserModel
}