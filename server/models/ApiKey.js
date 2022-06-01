const mongoose = require('mongoose');

const apikeySchema = new mongoose.Schema({
    apiName:{
        type: String,
        required: true
    },
    apiKey:{
        type: String,
        required: true
    }
})

module.exports = mongoose.model("ApiKey",apikeySchema);