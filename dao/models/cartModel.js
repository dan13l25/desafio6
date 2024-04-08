import mongoose from "mongoose";
const { Schema } = mongoose;

const collection = "Carts";

const schema = new Schema({

    quantity: {
        type: Number,
        required: true,
        min: 1,
    },
    product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product'
    },
});

const cartsModel = mongoose.model(collection, schema);

export default cartsModel;