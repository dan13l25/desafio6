import mongoose from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2"

const { Schema } = mongoose;

const productSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    code: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    brand: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    stock: {
        type: Number,
        required: true
    },
    status: {
        type: Boolean,
        required: true
    },
    thumbnails: {
        type: [String],
        required: true
    },
    cart: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'cartsModel'
    },
});

productSchema.plugin(mongoosePaginate)
const Product = mongoose.model("Product", productSchema);

export default Product;
