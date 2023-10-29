const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    p_id: {
        type: String,
        required: true,
        unique: true,
    },
    url:{
        type: String,
        required: true,
    },
    detailUrl:{
        type: String,
        required: true,
    },
    title:{
        shortTitle: {
            type: String,
            required: true,
        },
        longTitle: {
            type: String,
            required: true,
        },
    },
    price:{
        mrp:{
            type: Number,
            required: true,
        },
        cost:{
            type: Number,
            required: true,
        },
        discount:{
            type: String,
            required: true,
        },
    },
    quantity:{
        type: Number,
        required: true,
    },
    description:{
        type: String,
    },
    discount:{
        type: String,
    },
    tagline:{
        type: String,
    },
});



module.exports = mongoose.model("product", productSchema);