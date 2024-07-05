const mongoose = require("mongoose");

// ---------------------------------------------SCHEMA for user---------------------------------------//
const userSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
        maxlength: 30,
        minlength: 3,
    },
    email: {
        type: String,
        required: true,
        minlength: 8
    },
    password: {
        type: String,
        required: true,
        minlength: 6
    },
    createdAt: {
        type: Date,
        default: () => new Date(),
    }
},
{
    versionKey: false // remove version form object
});

module.exports = mongoose.model("users", userSchema);
