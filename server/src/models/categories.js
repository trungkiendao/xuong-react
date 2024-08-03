import mongoose from "mongoose";

const categorySchema = new mongoose.Schema(
    {
        name: {
            type: String
        },
        description: {
            type: String,
            required: true,
          },
       
    }
)

export default mongoose.model('categories',categorySchema)