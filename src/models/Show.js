const mongoose = require("mongoose");

const ShowSchema = new mongoose.Schema({
    id: {type: Number, required: true},
    name: {type: String, required: true},
    image: {type: Map, of: String},
    rating: {type: Map, of: String},
    premiered: String,
    summary: String,
    genres: [String]
})

const Show = mongoose.model("show", ShowSchema);
module.exports = {Show, ShowSchema};