const mongoose = require('mongoose');
const laptopSchema =  mongoose.Schema({
    name: String,
    techSpecs: String,
    price: {
        type: Number,
        get: v => parseFloat(v).toFixed(1),
        set: v => parseFloat(v).toFixed(1),
        required: true
    },
    photo: String
})

module.exports = mongoose.model('laptopdb', laptopSchema);