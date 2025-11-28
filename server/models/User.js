import mongoose, { mongo } from "mongoose";

const userSchema = new mongoose.Schema({
    firstName: {
        type: String, required: true,
    }, lastName: {
        type: String, required: true,
    }, username: {
        type: String, unique: true, required: true,
    }, gender: {
        type: String, required: true,
    }, email: {
        type: String, unique: true,
    }, age: {
        type: Date, required: true,
    }, profession: {
        type: String
    }, password: {
        type: String, required: true,
    }, role: {
        type: String, enum: ["admin", "player"], default: "player", required: true,
    }, country: {
        type: String,
    }, profileImage: {
        type: String,
    }, createdAt: {
        type: Date, default: Date.now,
    }, updatedAt: {
        type: Date, default: Date.now,
    },
});

const User = mongoose.model("User", userSchema)
export default User