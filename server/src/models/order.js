import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Types.ObjectId,
        ref: "users"
    },
    items: [{
        productId: {
            type: mongoose.Types.ObjectId,
            ref: "products"
        },
        quantity: {
            type: Number
        }
    }]

}, { timestamps: true })


export default mongoose.model("cart", orderSchema)