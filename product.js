
const mongoose = require("mongoose");

const ProductSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
        maxlength: 100,
        minlength: 3,
    }, 
    price: {
        type: Number,
        min: 0,
        required: true

    },
    image: {
        type: String,
        required: true,
        maxlength: 10000,
        minlength: 3,
    },
    id: {
        type: Number,
        required: true,
        min: 0,

    },
    batch: {
        type: String,
        required: true,
        maxlength: 5,
        minlength: 1,
    },
    detail: {
        type: String,
        required: true,
        maxlength: 150,
        minlength: 10,
    },

    brand: {
        type: String,
        required: true,
        maxlength: 100,
        minlength: 2,
    },


},

    {
        versionKey: false // remove the version 
    }
);

module.exports = mongoose.model("Product", ProductSchema);
