import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
   title: {
      type: String,
      // required: true
      required: [true, "Khong dươc de trong ten"],
      // default: "kiendt"
   },
   price: {
      type: Number,
      required: true
   },
   description: {
      type: String,
      required: true
   },
   image: {
      type: String,
      required: true
   },
   categoryId: {
      type: mongoose.Types.ObjectId,
      ref: "categories"
   },
   isShow: {
      type: Boolean,
      default: true
   }
})

export default mongoose.model('products', productSchema)