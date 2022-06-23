const mongoose = require('mongoose');

const apikeySchema = new mongoose.Schema({
    apiName:{
        type: String,
        required: true
    },
    apiKey:{
        type: String,
        required: true
    },
    apiUsername:{
        type: String,
        required: false
    },
    supplierId:{
        type:String,
        required: false
    }
})

module.exports = mongoose.model("ApiKey",apikeySchema);